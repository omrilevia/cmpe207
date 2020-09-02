/*
 CMPE207 Assignment 1
 By Omri Levia
 Code written following "Creating a TCP Client in C++" tutorial by Sloan Kelly
 https://www.youtube.com/watch?v=0Zr_0Jy8mWE&t=10s

 inet_pton function obtained from stack overflow user Petar Korpanaic:
 https://stackoverflow.com/a/20816961
*/
#include <iostream>
#include <string>
#include <WS2tcpip.h>
#include <winsock2.h>
#include <stdlib.h>
#pragma comment(lib, "ws2_32.lib")

using namespace std;
int inet_pton(int af, const char *src, void *dst);
int main(){
    string ipAddress = "94.142.241.111" ;
    int port = 23 ;

    // initialize winsock
    WSAData data ;
    WORD ver = MAKEWORD(2,2) ;
    int wsResult = WSAStartup(ver, &data) ;
    if(wsResult != 0){
        cerr << "can't start winsock, err # " << wsResult << endl ;
        return 1;
    }

    // create socket
    SOCKET sock = socket(AF_INET, SOCK_STREAM, 0) ;
    if(sock == INVALID_SOCKET){
        cerr << "Can't create socket, err #" << WSAGetLastError() << endl ;
        WSACleanup();
    }

    // fill in a hint structure
    sockaddr_in hint ;
    hint.sin_family = AF_INET ;
    hint.sin_port = htons(port);
    inet_pton(AF_INET, ipAddress.c_str(), &hint.sin_addr) ;

    // connect to server
    int connResult = connect(sock, (sockaddr*)&hint, sizeof(hint)) ; 
    if(connResult == SOCKET_ERROR){
        cerr << "Can't connect to server, error #" << WSAGetLastError() << endl ;
        closesocket(sock);
        WSACleanup();
        return 1;
    }
    // do-while loop to send and receive data
    char buf[4096];
    do{
        ZeroMemory(buf, 4096) ;
        int bytesReceived = recv(sock, buf, 4096, 0) ;
        if(bytesReceived > 0){
            cout << string(buf, 0, bytesReceived) ;
        }
    }while(true);
    // gracefully close down 
    closesocket(sock);

    return 0;
}

int inet_pton(int af, const char *src, void *dst)
{
  struct sockaddr_storage ss;
  int size = sizeof(ss);
  char src_copy[INET6_ADDRSTRLEN+1];

  ZeroMemory(&ss, sizeof(ss));
  /* stupid non-const API */
  strncpy (src_copy, src, INET6_ADDRSTRLEN+1);
  src_copy[INET6_ADDRSTRLEN] = 0;

  if (WSAStringToAddress(src_copy, af, NULL, (struct sockaddr *)&ss, &size) == 0) {
    switch(af) {
      case AF_INET:
    *(struct in_addr *)dst = ((struct sockaddr_in *)&ss)->sin_addr;
    return 1;
      case AF_INET6:
    *(struct in6_addr *)dst = ((struct sockaddr_in6 *)&ss)->sin6_addr;
    return 1;
    }
  }
  return 0;
}
