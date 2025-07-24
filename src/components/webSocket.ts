class WebSocketClient {
  url: string;
  socket: WebSocket | null;
  listeners: ((data: any) => void)[];
  userID: string | null = null;
  shouldReconnect = true;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
    this.listeners = [];
  }
  
  setUserID(userID: string | null){
    this.userID = userID;
  }

  connect() {
    if (this.socket || !this.userID) return;

    console.log('Websocket opened');
    this.shouldReconnect = true;

    const fullUrl = `${this.url}?userID=${encodeURIComponent(this.userID)}`;

    this.socket = new WebSocket(fullUrl);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.listeners.forEach((cb) => cb(data));
    };

    this.socket.onclose = () => {
      console.log('WebSocket closed');
      this.socket = null;
      if(this.shouldReconnect){
        setTimeout(() => this.connect(), 3000); // reconnect after 3 sec
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect() {
    this.shouldReconnect = false;
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  addListener(cb: (data: any) => void) {
    this.listeners.push(cb);
  }

  removeListener(cb: (data: any) => void) {
    this.listeners = this.listeners.filter((fn) => fn !== cb);
  }
}

const wsClient = new WebSocketClient('wss://mnwrni72xk.execute-api.us-west-2.amazonaws.com/production');

export default wsClient;
