import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();

  constructor(private readonly openaiService: OpenaiService) {}

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.clients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, userMessage: string): Promise<void> {
    try {
      const aiResponse = await this.openaiService.chat({ role: 'user', content: userMessage });
      
      this.server.emit('message', { role: 'ai', content: aiResponse });
    } catch (error) {
      console.error('Error processing AI response:', error.message);
    }
  }
}
