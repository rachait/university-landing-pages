# Pipedream Integration Guide

This guide will help you set up the Pipedream workflow for receiving and processing lead form submissions.

## 📋 Prerequisites

- Pipedream account (free tier is sufficient)
- Access to your deployed landing pages

## 🚀 Quick Setup (5 minutes)

### Step 1: Create New Workflow

1. Go to [Pipedream](https://pipedream.com/)
2. Sign up or log in
3. Click **"New Workflow"**
4. Name it: `University Lead Capture`

### Step 2: Add HTTP Trigger

1. Click **"Select a Trigger"**
2. Choose **"HTTP / Webhook"**
3. Select **"New Requests"**
4. **Copy the endpoint URL** - it looks like:
   ```
   https://xxxxx.m.pipedream.net
   ```
5. Click **"Create source"**

### Step 3: Test the Trigger

Your workflow is now ready to receive data! Before adding more steps, let's test it:

1. Open your deployed landing page
2. Fill out the form
3. Submit it
4. Go back to Pipedream
5. You should see the incoming data in the trigger event

## 🔧 Configure Your JavaScript Files

Now update your landing page JavaScript files with the Pipedream endpoint:

### In `js/manipal.js` (Line 4):
```javascript
const PIPEDREAM_ENDPOINT = 'https://xxxxx.m.pipedream.net'; // Replace with your URL
```

### In `js/symbiosis.js` (Line 4):
```javascript
const PIPEDREAM_ENDPOINT = 'https://xxxxx.m.pipedream.net'; // Replace with your URL
```

**Important:** Redeploy your site after making these changes!

## 📊 Enhanced Workflow Steps

Now let's add steps to process the lead data:

### Step 4: Parse and Log Lead Data

Click **"+"** to add a new step → **"Run Node.js code"**

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const lead = steps.trigger.event.body;
    
    // Log the lead for inspection
    console.log('📧 New Lead Received!');
    console.log('University:', lead.university);
    console.log('Name:', lead.fullName);
    console.log('Email:', lead.email);
    console.log('Phone:', lead.phone);
    console.log('Course:', lead.course);
    console.log('State:', lead.state);
    console.log('Intake Year:', lead.intakeYear);
    console.log('Timestamp:', lead.timestamp);
    
    // Return formatted data for next steps
    return {
      university: lead.university,
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      state: lead.state,
      course: lead.course,
      intakeYear: lead.intakeYear,
      consent: lead.consent,
      timestamp: lead.timestamp,
      formattedDate: new Date(lead.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
      })
    };
  },
});
```

### Step 5: Send Email Notification (Optional)

Add **"Send Email"** action:

1. Click **"+"** → Search for **"Email"** → **"Send Email"**
2. Configure:
   - **To:** Your email (e.g., `admissions@university.edu`)
   - **Subject:** `🎓 New Lead: {{steps.trigger.event.body.fullName}} - {{steps.trigger.event.body.course}}`
   - **Body (HTML):**

```html
<h2>New Admission Inquiry</h2>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>University:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.trigger.event.body.university}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.trigger.event.body.fullName}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.trigger.event.body.email}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.trigger.event.body.phone}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>State:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.trigger.event.body.state}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Course:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.trigger.event.body.course}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Intake Year:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.trigger.event.body.intakeYear}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Submitted:</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd;">{{steps.parse_lead.formattedDate}}</td>
  </tr>
</table>

<p style="margin-top: 20px; color: #666;">
  Lead submitted via: {{steps.trigger.event.body.university}} Landing Page
</p>
```

### Step 6: Store in Google Sheets (Optional but Recommended)

1. Click **"+"** → Search for **"Google Sheets"**
2. Select **"Add Single Row"**
3. Connect your Google account
4. Create or select a spreadsheet named "University Leads"
5. Map fields:
   - Column A: `{{steps.trigger.event.body.timestamp}}`
   - Column B: `{{steps.trigger.event.body.university}}`
   - Column C: `{{steps.trigger.event.body.fullName}}`
   - Column D: `{{steps.trigger.event.body.email}}`
   - Column E: `{{steps.trigger.event.body.phone}}`
   - Column F: `{{steps.trigger.event.body.state}}`
   - Column G: `{{steps.trigger.event.body.course}}`
   - Column H: `{{steps.trigger.event.body.intakeYear}}`

**Pro Tip:** Create headers in your Google Sheet first:
```
Timestamp | University | Full Name | Email | Phone | State | Course | Intake Year
```

### Step 7: Send Auto-response Email (Optional)

Add another **"Send Email"** action:

1. Click **"+"** → **"Email"** → **"Send Email"**
2. Configure:
   - **To:** `{{steps.trigger.event.body.email}}`
   - **Subject:** `✅ Application Received - {{steps.trigger.event.body.university}}`
   - **Body (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1e40af;">Thank You for Your Interest!</h2>
  
  <p>Dear {{steps.trigger.event.body.fullName}},</p>
  
  <p>Thank you for your interest in <strong>{{steps.trigger.event.body.university}}</strong>. 
  We have received your application for <strong>{{steps.trigger.event.body.course}}</strong> 
  for the <strong>{{steps.trigger.event.body.intakeYear}}</strong> intake.</p>
  
  <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0;">Your Application Details:</h3>
    <ul>
      <li><strong>Course:</strong> {{steps.trigger.event.body.course}}</li>
      <li><strong>Intake Year:</strong> {{steps.trigger.event.body.intakeYear}}</li>
      <li><strong>State:</strong> {{steps.trigger.event.body.state}}</li>
    </ul>
  </div>
  
  <p>Our admissions team will review your application and contact you within 24-48 hours.</p>
  
  <p><strong>Next Steps:</strong></p>
  <ol>
    <li>Keep your phone accessible for our call</li>
    <li>Check your email (including spam) for updates</li>
    <li>Prepare your academic documents</li>
  </ol>
  
  <p>If you have any immediate questions, please reply to this email or call us.</p>
  
  <p style="margin-top: 30px;">
    Best regards,<br>
    <strong>Admissions Team</strong><br>
    {{steps.trigger.event.body.university}}
  </p>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
  
  <p style="font-size: 12px; color: #6b7280;">
    This is an automated message. Please do not reply directly to this email.
  </p>
</div>
```

## 🎯 Alternative Integrations

### Option A: Slack Notification

1. Add **"Slack"** → **"Send Message"**
2. Connect Slack workspace
3. Choose channel (e.g., #admissions)
4. Message:
```
🎓 *New Lead Alert!*

*University:* {{steps.trigger.event.body.university}}
*Name:* {{steps.trigger.event.body.fullName}}
*Course:* {{steps.trigger.event.body.course}}
*Email:* {{steps.trigger.event.body.email}}
*Phone:* {{steps.trigger.event.body.phone}}
*State:* {{steps.trigger.event.body.state}}
*Intake:* {{steps.trigger.event.body.intakeYear}}
```

### Option B: Airtable Storage

1. Add **"Airtable"** → **"Create Record"**
2. Connect Airtable account
3. Select base and table
4. Map fields similar to Google Sheets

### Option C: Webhook to CRM

1. Add **"HTTP"** → **"Send POST Request"**
2. URL: Your CRM webhook endpoint
3. Body: `{{steps.trigger.event.body}}`

## ✅ Testing Your Workflow

1. **Deploy your site** with the updated Pipedream endpoint
2. **Submit a test form** with your own details
3. **Check Pipedream logs** - you should see the workflow execute
4. **Verify all actions worked:**
   - Email received
   - Google Sheet updated
   - Slack notification (if configured)

### Test Data Example:
```
Full Name: Test User
Email: test@example.com
Phone: 9876543210
State: Karnataka
Course: B.Tech Computer Science
Intake Year: 2025
```

## 🔒 Security Best Practices

1. **Never expose your Pipedream endpoint in public repos** (it's already in the code, which is fine for this project)
2. **Add rate limiting** (Pipedream free tier has built-in limits)
3. **Validate data** in your workflow before storing
4. **Monitor usage** to detect abuse

## 📈 Monitoring & Analytics

View workflow execution:
1. Go to your workflow in Pipedream
2. Click **"Event History"**
3. See all incoming leads and execution status

Export data:
- From Google Sheets for analysis
- Use Pipedream's export feature

## 🐛 Troubleshooting

### "Failed to fetch" error
- Check if Pipedream endpoint is correct
- Verify CORS is enabled (Pipedream enables by default)
- Check browser console for errors

### Workflow not triggering
- Verify the endpoint URL is correct in JS files
- Check if form validation is passing
- Look at browser Network tab to see if request is sent

### Email not received
- Check spam folder
- Verify email address in workflow
- Check Pipedream logs for errors

### Google Sheets not updating
- Verify Google Sheets connection is active
- Check if column mapping is correct
- Ensure spreadsheet has write permissions

## 💡 Tips for Production

1. **Set up monitoring alerts** in Pipedream
2. **Create separate workflows** for each university if needed
3. **Add data validation** in the first step
4. **Log errors** to a separate sheet or service
5. **Set up email notifications** for workflow failures

## 📞 Support

If you encounter issues:
1. Check Pipedream's [documentation](https://pipedream.com/docs/)
2. Review workflow execution logs
3. Test with Pipedream's built-in test feature

---

Your Pipedream workflow is now set up! Every form submission will be automatically captured, logged, and processed according to your configuration. 🎉
