import { host } from "../../utils/env";
import { BannerImage, SwiperDot, SwiperSlide, SwiperWrapper } from "./banners.styles";

const StaticBanners = [require("../../../assets/banners/b1.jpg"), require("../../../assets/banners/b3.jpg"), require("../../../assets/banners/b4.jpg")];

export const HomeHeaderBanner = ({ userBanners = [] }) => {

    var banners = (userBanners == null || userBanners.length == 0) ? StaticBanners : userBanners;

    return (
        <SwiperWrapper showsButtons={false} autoplay={true} autoplayTimeout={5} activeDot={<SwiperDot />} loop={true}>
            {banners.map((thisBanner, index) => {
                return (<SwiperSlide key={thisBanner + "_" + index}><BannerImage source={thisBanner} /></SwiperSlide>)
                //return (<SwiperSlide key={thisBanner + "_" + index}><BannerImage source={{ uri: `${host}/images/banners/${thisBanner}` }} /></SwiperSlide>)
            })}
        </SwiperWrapper>
    )
}
