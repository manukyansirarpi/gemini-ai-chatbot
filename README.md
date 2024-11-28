# Gemini AI Chatbot

## Overview

Gemini AI Chatbot is a web application built using modern web technologies to provide an interactive chatbot experience. This document provides setup instructions, dependencies, and configuration details.

## Technologies Used

- Next.js: A React framework for server-side rendering and static site generation.
- React: A JavaScript library for building user interfaces.
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- TypeScript: A strongly typed programming language that builds on JavaScript.
- Google Generative AI SDK and  Vercel AI SDK: For integrating AI capabilities into the chatbot.


## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

- Clone the repository:

```bash
git clone git@github.com:manukyansirarpi/gemini-ai-chatbot.git
cd gemini-ai-chatbot
npm install
```
 
 - Create a .env.local file and add the following environment variables:

```bash
 MONGODB_URI=mongodb://localhost:27017/ai-chatbot   
 GEMINI_API_KEY=[your key ]
 API_URL=http://localhost:3000/
``` 


## Running the Application

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Conclusion
Gemini AI Chatbot leverages modern web technologies to provide a seamless and interactive chatbot experience. The project demonstrates the integration of AI capabilities and efficient state management in a web application.

demo -  https://youtu.be/yO6Pxvjllh8 
