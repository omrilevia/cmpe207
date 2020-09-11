package main

import (
	"bufio"
	"fmt"
	"io"
	"net"
	"os"
)

func main() {
	l, err := net.Listen("tcp", "127.0.0.1:8080")
	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	for {
		conn, err := l.Accept()
		if err != nil {
			fmt.Println("Error: ", err)
			continue
		}

		go echo(conn)
	}
}

func echo(conn net.Conn) {
	r := bufio.NewReader(conn)
	for {
		line, err := r.ReadBytes(byte('\n'))
		switch err {
		case nil:
			break
		case io.EOF:
		default:
			fmt.Println("Error: ", err)
		}
		conn.Write(line)
	}
}
