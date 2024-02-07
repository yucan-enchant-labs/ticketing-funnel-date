import { TicketMeta } from "../types/common";

export const TicketCard: React.FC<{ meta: TicketMeta }> = ({ meta }) => {
    const { counterTitle, ageRange, counterDescription, counterPriceValue, type, biggerText, questionMark, selectedTicketIdx, rangeLowest, isFriendPack, familyPack, isFamilyPack, adultPack, extCard, sectionIndex, gaPrices, isGroup } = meta;
    return (
        <div className="p-4 border rounded">
            
        </div>
    );
};
