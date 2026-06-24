// Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const userInput = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Open chatbot
    toggleBtn.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
        userInput.focus();
    });

    // Close chatbot
    closeBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Send message function
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user-message');
        userInput.value = '';
        userInput.disabled = true;
        sendBtn.disabled = true;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            if (data.reply) {
                addMessage(data.reply, 'bot-message');
            } else {
                addMessage('Sorry, I encountered an error. Please try again.', 'bot-message');
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error. Please try again.', 'bot-message');
        } finally {
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
        }
    }

    // Add message to chat UI
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initialize with a greeting
    setTimeout(() => {
        addMessage('Hello! I am your AI assistant. How can I help you today?', 'bot-message');
    }, 500);
});
