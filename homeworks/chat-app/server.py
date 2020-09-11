import socket
import ipaddress
import select


class Client:
    def __init__(self, sock, address):
        self.partner = None
        self.sock = sock
        self.address = address
        self.paired = False

    def fileno(self):
        return self.sock.fileno()


def main():
    greeting = b'You are connected to the server. Pairing you with a chat partner...\n'
    listenSock = socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0)
    listenSock.bind(('127.0.0.1', 57000))
    listenSock.listen(5)
    server = Client(listenSock, '127.0.0.1')
    read = [server]
    write = []
    x_list = []
    clients = []
    while True:

        # (clientSock, address) = listenSock.accept()

        # newClient = Client(clientSock, address)
        # clients.append(newClient)
        # clientSock.send(greeting)
        # if len(clients) > 1 and len([c for c in clients if c.paired is False]) > 0:

        # pairClient(newClient, clients)
        # clientSock.send(b'You are now paired! You may begin sending messages\n')
        # newClient.partner.sock.send(b'You are now paired! You may begin sending messages\n')

        rx_list, tx_list, x_list = select.select(read, [], [])

        for s in rx_list:
            if s.sock is listenSock:
                (clientSock, address) = listenSock.accept()
                newClient = Client(clientSock, address)
                read.append(newClient)
                clients.append(newClient)
                clientSock.send(greeting)

                if len(clients) > 1 and len([c for c in clients if c.paired is False]) > 0:
                    pairClient(newClient, clients)
                else:
                    clientSock.send(b'No connections available, sit tight...\n')
            else:
                data = s.sock.recv(4096)
                if data:
                    s.partner.sock.send(data)
                else:
                    s.sock.close()
                    read.remove(s)
                    clients.remove(s)
                    s.partner.partner = None
                    s.partner.paired = False


def pairClient(client: Client, clientList):
    for c in clientList:
        if c.paired is False and c != client:
            c.partner = client
            client.partner = c
            c.paired = True
            client.paired = True
            return


if __name__ == '__main__':
    main()
