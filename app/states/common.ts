import { atom } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { splitAtom } from 'jotai/utils'
import { MetaProps } from '../types/state';
// Create your atoms and derivatives
const textAtom = atom('hello')
export const uppercaseAtom = atom(
    (get) => get(textAtom).toUpperCase()
)

export const metaAtom = atom<MetaProps>({});
export const ticketAtom = atom<any>({});
// export const metaAtom = atom(
//     (get) => get(meta)
// )

const initialData = {
    people: [
      {
        name: 'Luke Skywalker',
        information: { height: 172 },
        siblings: ['John Skywalker', 'Doe Skywalker'],
      },
      {
        name: 'C-3PO',
        information: { height: 167 },
        siblings: ['John Doe', 'Doe John'],
      },
    ],
    films: [
      {
        title: 'A New Hope',
        planets: ['Tatooine', 'Alderaan'],
      },
      {
        title: 'The Empire Strikes Back',
        planets: ['Hoth'],
      },
    ],
    info: {
      tags: ['People', 'Films', 'Planets', 'Titles'],
    },
  }
const dataAtom = atom(initialData)
const peopleAtom = focusAtom(dataAtom, (optic) => optic.prop('people'))
export const peopleAtomsAtom = splitAtom(peopleAtom)
