import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'; // Import cors

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type'], // Allow these headers
})); // Enable CORS

// Add a root route to handle "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Handle preflight requests
app.options('/api/send-emails', cors());

app.post('/api/send-emails', async (req, res) => {
  const { smtpSettings, emailContent, recipients, batchSize = 100, delayBetweenBatches = 300 } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpSettings.host,
    port: parseInt(smtpSettings.port),
    secure: smtpSettings.port === '465',
    auth: {
      user: smtpSettings.username,
      pass: smtpSettings.password,
    },
  });

  let successCount = 0;
  let failureCount = 0;
  const errors = [];

  // Send emails in batches
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    
    for (const recipient of batch) {
      try {
        // Replace placeholders in email content
        const personalizedContent = emailContent.replace(/\{(\w+)\}/g, (match, field) => 
          recipient[field] || match
        );

        await transporter.sendMail({
          from: smtpSettings.username,
          to: recipient.email,
          subject: "Your Email Campaign",
          html: personalizedContent,
        });

        successCount++;
      } catch (error) {
        failureCount++;
        errors.push({
          email: recipient.email,
          error: error.message,
        });
      }

      // Send progress update
      res.write(JSON.stringify({
        type: 'progress',
        data: {
          total: recipients.length,
          success: successCount,
          failure: failureCount,
          progress: ((successCount + failureCount) / recipients.length) * 100,
        },
      }) + '\n');
    }

    // Delay between batches
    if (i + batchSize < recipients.length) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches * 1000));
    }
  }

  // Send final response
  res.end(JSON.stringify({
    type: 'complete',
    data: {
      total: recipients.length,
      success: successCount,
      failure: failureCount,
      errors,
    },
  }));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});