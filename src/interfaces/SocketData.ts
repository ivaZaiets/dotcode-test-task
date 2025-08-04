export interface SocketData {
  op: string;
  x: {
    hash: string;
    inputs: any[];
    out: any[];
  };
}
