package main

import (
	"bufio"
	"fmt"
	"io"
	"net"
	"os"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:8080")
	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	lines := bufio.NewReader(os.Stdin)
	response := bufio.NewReader(conn)

	for {
		userLine, err := lines.ReadBytes(byte('\n'))
		switch err {
		case nil:
			conn.Write(userLine)
		case io.EOF:
			os.Exit(0)
		default:
			fmt.Println("Error: ", err)
			os.Exit(1)
		}

		serverLine, err := response.ReadBytes(byte('\n'))
		switch err {
		case nil:
			fmt.Println(string(serverLine))
		case io.EOF:
			os.Exit(0)
		default:
			fmt.Println("Error: ", err)
			os.Exit(2)
		}
	}
}
