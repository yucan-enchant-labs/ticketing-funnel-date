import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { metaAtom, ticketAtom } from '@/app/states/common';
import { eventTemplate } from "../queries/eventGroups";
import { City } from '../lib/definitions';
import { useState } from 'react';

export const selectCity = () => {
  const [isAddon, setIsAddon] = useState<boolean>(false);
  const setMetaAtom = useSetAtom(metaAtom);
  const setTicketMeta = useSetAtom(ticketAtom);
  const router = useRouter();

  const cityMeta = async (city: City) => {
    try {
      // set meta
      const eventData = await eventTemplate(city.id);
      const { sellerMeta, eventTemplates, eventMeta, suiteEventMeta } = eventData;
      const ticketTypes = eventTemplates.ticket_type._data;
      const ticketGroups = eventTemplates.ticket_group;
      const meta: any = eventTemplates.meta._data;
      for (const item of ticketTypes) {
        item.qty = 0;
      }
      const addonMeta: any = [];
      const iconMeta: any = [];

      for (const metaItem of meta) {
        if (metaItem.metakey === "event_type" && metaItem.value.trim() === "addon") {
          addonMeta.push(metaItem);
        }
      
        if (metaItem.metakey === "icon_link") {
          iconMeta.push(metaItem);
        }
      }

      for (const metaItem of meta) {
        if (metaItem.resource === "event_template") {
          const eventIdx = eventTemplates.event_template._data.findIndex((e: any) => e.id === metaItem.resource_id);
          if (eventIdx !== -1) {
            eventTemplates.event_template._data[eventIdx][metaItem.metakey] = metaItem.value;
          }
        }

        if (metaItem.resource === "ticket_group") {
          const groupIdx = eventTemplates.ticket_group._data.findIndex((e: any) => e.id === metaItem.resource_id);
          if (groupIdx !== -1) {
            ticketGroups._data[groupIdx][metaItem.metakey] = metaItem.value;
          }
        }
      }

      const addonEvent: any = [];
      const tempEvents: any = [];

      for (let j = 0; j < eventTemplates.event_template._data.length; j++) {
        setIsAddon(false);
        if (
          eventTemplates.event_template._data[j].event_type.trim() === "addon"
        ) {
          const tmpAddonEvent = eventTemplates.event_template._data[j];
          tmpAddonEvent.select = false;
          addonEvent.push(tmpAddonEvent);
          setIsAddon(true);
        }

        if (!isAddon) {
          tempEvents.push(eventTemplates.event_template._data[j]);
        }
      }

      const tmpGroup: typeof ticketGroups._data = [];
      const tmpAddonGroups: typeof ticketGroups._data = [];
      for (const ticketGroup of ticketGroups._data) {
        let isAddon = false;
        for (const addon of addonMeta) {
          if (ticketGroup.event_template_id === addon.resource_id) {
            tmpAddonGroups.push(ticketGroup);
            isAddon = true;
            break;
          }
        }

        for (const icon of iconMeta) {
          if (ticketGroup.event_template_id === icon.resource_id) {
            ticketGroup.icon_link = icon.value;
            tmpAddonGroups.push(ticketGroup);
            isAddon = true;
            break;
          }
        }

        if (!isAddon) {
          tmpGroup.push(ticketGroup);
        }
      }


      const tmpAddonEventDetails: any = [];
      for (const addonGroup of tmpAddonGroups) {
        for (const item of ticketTypes) {
          if (addonGroup.id === item.ticket_group_id) {
            const details = item;
            tmpAddonEventDetails.push({
              ticketType: addonGroup.name,
              details,
            });
          }
        }
      }

      setMetaAtom((prevMeta) => ({
        ...prevMeta,
        city: city,
        sellerMeta: sellerMeta || prevMeta.sellerMeta,
        eventTemplates: eventTemplates || prevMeta.eventTemplates,
        eventMeta: eventMeta || prevMeta.eventMeta,
        suiteEventMeta: suiteEventMeta || prevMeta.suiteEventMeta,
      }));
      // console.log('sysys', ticketTypes, 2, tmpGroup, 3, tmpAddonGroups, 4, addonEvent, 5, tmpAddonEventDetails, 6, tempEvents);
      // set ticket meta
      setTicketMeta(() => ({
        ticketTypes: ticketTypes,
        ticketGroups: tmpGroup,
        addonGroups: tmpAddonGroups,
        addonEvents: addonEvent,
        addonEventDetails: tmpAddonEventDetails,
        eventTemplates: tempEvents,
      }))
      
    } catch (error) {
      console.error("Error handling city click:", error);
    }
    router.push(`${city.key}/general-admission`);
  };

  return { cityMeta };
};
