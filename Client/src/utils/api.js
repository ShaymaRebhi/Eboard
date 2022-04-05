export const host="http://localhost:3000";

export const sendMessagesRoute=`${host}/chat/add`;
export const getAllMessagesRoute=`${host}/chat/all`;
export const getUserConnect=`${host}/user/connect`;
export const getclassApi = {
    async getclass() {
      const { data } = await host.get(`class/all/`);
      return data;
    },
    async getclassById(idclass) {
      const { data } = await host.get(`class/` + idclass);
      return data;
    },
    async getclassByLevel(iduser,status) {
        const { data } = await host.get(`class/bylevel/${iduser}/${status}`);
        return data;
      },
      async getclassByYear(iduser,status) {
        const { data } = await host.get(`class/byyear/${iduser}/${status}`);
        return data;
      },
  };