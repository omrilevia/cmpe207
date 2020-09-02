import socket
import ipaddress


def main():
    servIP = ipaddress.IPv4Address('94.142.241.111').exploded
    servPort = 23
    sock = socket.create_connection((servIP, servPort))
    buf = b''
    while True:
        buf = sock.recv(1024)
        print(buf.decode('utf-8'))


if __name__ == '__main__':
    main()
