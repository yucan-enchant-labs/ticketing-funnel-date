'use client'
import LocationPage from "./locations/page"
import { ContainerWrapper } from "./styles/container";
import CusHeader from "./ui/layouts/header";
import NavLinks from "./[city]/nav-links";
import axios, { AxiosInstance } from 'axios';
const constants = require("@/app/constants/index");
const createAxiosInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL,
        timeout: 30000,
    });
};

export const axiosTicketure = createAxiosInstance(constants.TICKETURE_CACHE_API);
export const axiosEnchant = createAxiosInstance(constants.ENCHANT_API);
export const axiosWaiver = createAxiosInstance(constants.WAIVERS_API);
export const axiosMagic = createAxiosInstance(constants.ENCHANT_API);
export default function Page() {
    return (
        <ContainerWrapper>
            <CusHeader />
            <LocationPage />
            {/* <Dates /> */}
            {/* <Link
                href="/dates"
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            ><span>Dates</span>
            </Link> */}
 
          <NavLinks />
        </ContainerWrapper>
    )
}