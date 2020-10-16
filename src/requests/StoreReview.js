const development = false;
const base_url = development
  ? "http://localhost:3001"
  : "https://youtube-reminder-server.herokuapp.com";

export class StoreReview {
  static async storeInitialReview(session) {
    try {
      await fetch(`${base_url}/storeInitialReview`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "*",
          "Access-Control-Request-Headers": "*",
          "Access-Control-Request-Method": "*",
        },
        mode: "cors",
        body: JSON.stringify(session),
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async storeEndReview(endSession, id) {
    try {
      await fetch(`${base_url}/storeEndSessionInfo/` + id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "*",
          "Access-Control-Request-Headers": "*",
          "Access-Control-Request-Method": "*",
        },
        mode: "cors",
        body: JSON.stringify(endSession),
      });
    } catch (e) {
      console.log(e);
    }
  }
}
