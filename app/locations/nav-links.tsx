// // app/ui/pages/nav-links.tsx
// import {
//   UserGroupIcon,
//   HomeIcon,
// } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';
// import { City } from '@/app/lib/definitions';

// const links = [
//   { name: 'Home', href: '/', icon: HomeIcon },
//   { name: 'Dates', href: '/[city]/dates', icon: UserGroupIcon },
// ];

// export default function NavLinks({ city }: { city: City }) {
//   const pathname = usePathname();

//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;

//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={clsx(
//               'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
//               {
//                 'bg-sky-100 text-blue-600': pathname === link.href,
//               },
//             )}
//           >
//             <LinkIcon className="w-6" />
//             eee
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }
