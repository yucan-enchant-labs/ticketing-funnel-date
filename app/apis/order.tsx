import { axiosTicketure } from "../page";
import { userInfoProps } from "../types/order";

export const createCart = async (sellerId: string | undefined): Promise<{
  id:any; expires_at: string;
}> => {
  try {
    const response = await axiosTicketure.post("/api/my/cart", {
      channel_id: "web",
      seller_id: sellerId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const clearCart = async (cartId: string) => {
  try {
    const response = await axiosTicketure({
      url: `/api/my/cart/${cartId}`,
      method: "delete",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const reserveTickets = async (cartId: string, tickets: Array<any>) => {
  try {
    const resp = await axiosTicketure.post(
      `/api/my/cart/${cartId}/reserve`,
      {
        tickets,
      }
    );
    return resp;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export const getUserInfo = async (body:userInfoProps) => {

    await axiosTicketure.post("/api/user", body);
  // try {
  //   const user = await axiosTicketure.post("/api/user", body);
  //   // Add error in the pop-up if there's a 409 error
  //   // this.$store.dispatch("setUserInfo", user);
  //   console.log('fetchUser:', user);
  //   return user;
  // } catch (err:any) {
  //   if (err.response.data._data[0]._code === "conflict") {
  //   //   this.$store.dispatch("setEmailError", "");
  //   //   this.errorMsg = "";
  //   //   this.createdIdentityID =
  //   //     err.response.data._data[0]._extra.identity_id;
  //   } else {

  //   //   this.errorMsg = err.response.data._data[0]._description;
  //   //   if (err?.response?.data?.details?._data[0]?._description) {
  //   //     this.$store.dispatch(
  //   //       "setEmailError",
  //   //       err?.response?.data?.details?._data[0]?._description
  //   //     );
  //   //     this.emailValidationError =
  //   //       err?.response?.data?.details?._data[0]?._description;
  //   //   } else {
  //   //     this.$store.dispatch("setEmailError", "");
  //   //     this.emailValidationError = "";
  //     }
  //     throw "Could not create user";
  //   // }
  // }
}