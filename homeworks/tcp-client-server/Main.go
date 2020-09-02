package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	conn, err := net.Dial("tcp", "94.142.241.111:23")
	if err != nil {
		print(err)
	}
	inReader := bufio.NewReader(os.Stdin)
	cReader := bufio.NewReader(conn)
	for {
		//fmt.Print(">> ")
		text, _ := inReader.ReadString('\n')
		fmt.Fprintf(conn, text)

		message, _ := cReader.ReadString('\n')
		fmt.Print("->: " + message)
		if strings.TrimSpace(string(text)) == "STOP" {
			fmt.Println("TCP client exiting...")
			return
		}
	}
}
