import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { CloseFullscreen, TextsmsOutlined } from '@mui/icons-material';
import { useRequestAgent } from '../../hooks/use-request-agent';
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import Button from '../../components/Button';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const MinimizableChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [, isLoadingRequestChatBot, requestChatbot] =
    useRequestAgent<{ answer: string }>();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = { text: newMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');

      requestChatbot(
        {
          url: '/ollama/ask',
          method: 'POST',
          data: { question: newMessage },
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (data) => {
          const botMessage: ChatMessage = {
            text: data.answer,
            isUser: false,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      ).catch(() => {
        enqueueSnackbar('Erro ao enviar mensagem para o chatbot.', {
          variant: 'error',
        });
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1300,
      }}
    >
      {isChatOpen ? (
        <Paper elevation={4} sx={{ width: 300, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              borderBottom: '1px solid #eee',
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Chatbot
            </Typography>
            <IconButton onClick={toggleChat} size="small">
              <CloseFullscreen fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{
              height: 300,
              overflowY: 'auto',
              px: 2,
              py: 1,
              bgcolor: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: msg.isUser ? '#e0f7fa' : '#f0f0f0',
                  p: 1,
                  borderRadius: 1,
                  mb: 1,
                  maxWidth: '80%',
                  textAlign: 'justify',
                  alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            ))}
          </Box>

          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <TextField
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              fullWidth
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              color="info"
              onClick={handleSendMessage}
              isLoading={isLoadingRequestChatBot}
              disabled={isLoadingRequestChatBot}
              text='Enviar'
            >
            </Button>
          </Box>
        </Paper>
      ) : (
        <IconButton
          onClick={toggleChat}
          sx={{
            bgcolor: 'info.main',
            color: 'white',
            width: 60,
            height: 60,
            '&:hover': {
              bgcolor: 'info.dark',
            },
            boxShadow: 3,
          }}
        >
          <TextsmsOutlined />
        </IconButton>
      )}
    </Box>
  );
};

export default MinimizableChatbot;
