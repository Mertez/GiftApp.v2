import { host } from "../../utils/env";
import { BannerImage, SwiperDot, SwiperSlide, SwiperWrapper } from "./banners.styles";

const StaticBanners = [`b1.webp`, `b2.webp`];

export const HomeHeaderBanner = ({ userBanners = [] }) => {

    var banners = (userBanners == null || userBanners.length == 0) ? StaticBanners : userBanners;

    return (
        <SwiperWrapper showsButtons={false} autoplay={true} autoplayTimeout={5} activeDot={<SwiperDot />} loop={true}>
            {banners.map((thisBanner) => {
                return (<SwiperSlide key={thisBanner}><BannerImage source={{ uri: `${host}/images/banners/${thisBanner}` }} /></SwiperSlide>)
            })}
        </SwiperWrapper>
    )
}
