import React, { useState, useEffect } from 'react';
import { Fab, Tooltip, IconButton, Box, Paper, Typography, TextField, FormControlLabel, Checkbox, Divider, Select, MenuItem, Button } from '@mui/material';
import { Feedback, BugReport, Lightbulb, ContactMail, Close } from '@mui/icons-material';
import { styled } from '@mui/system';

const feedbackOptions = [
  { icon: <BugReport />, label: 'Report an issue', form: 'IssueForm' },
  { icon: <Feedback />, label: 'Share Feedback', form: 'FeedbackForm' },
  { icon: <Lightbulb />, label: 'Give Suggestion', form: 'SuggestionForm' },
  { icon: <ContactMail />, label: 'Contact Us', form: 'ContactForm' }
];

const FabButton = styled(Fab)({
  position: 'fixed',
  bottom: 32,
  right: 32,
  backgroundColor: '#F8F8F8',
  color: '#0F0F0F',
  zIndex: 2, 
  '&:hover': {
    backgroundColor: '#808080',
  },
});

const FabOptions = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFormOpen'
})(({ isFormOpen }) => ({
  display: 'flex',
  flexDirection: isFormOpen ? 'row' : 'column', 
  position: 'fixed',
  bottom: isFormOpen ? 80 : 160, 
  right: 32,
  zIndex: 1, 
  gap: '8px', 
  alignItems: 'center',
}));

const FabOptionButton = styled(IconButton)({
  backgroundColor: '#F8F8F8',
  color: '#0F0F0F',
  '&:hover': {
    backgroundColor: '#808080',
  },
});

const FeedbackContainer = styled(Paper)({
  position: 'fixed',
  bottom: 160,
  right: 32,
  padding: 16,
  maxWidth: 400,
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
});

const CommentBox = styled(Paper)({
  position: 'fixed',
  bottom: 80,
  right: 32,
  padding: 16,
  maxWidth: 400,
  backgroundColor: '#ffffff',
  color: '#000000',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  zIndex: 3, 
  whiteSpace: 'pre-line',
});

const FeedbackFab = () => {
  const [open, setOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (open) {
      setActiveForm(null);
      setSubmitted(false);
    }
  };

  const handleOptionClick = (form) => {
    setActiveForm(form);
    if (!open) {
      setOpen(true);
    }
  };

  const handleFormSubmit = (formName, successMessage) => {
    setActiveForm(null);
    setOpen(false);
    setSubmitted(true);
    setMessage(successMessage);
  };

  return (
    <>
      <FabButton onClick={handleToggle}>
        {open ? <Close /> : <Feedback />}
      </FabButton>
      {open && (
        <FabOptions isFormOpen={!!activeForm}>
          {feedbackOptions.map((option, index) => (
            <Tooltip title={option.label} key={index}>
              <FabOptionButton onClick={() => handleOptionClick(option.form)}>
                {option.icon}
              </FabOptionButton>
            </Tooltip>
          ))}
        </FabOptions>
      )}
      {activeForm && (
        <FeedbackContainer>
          <FormComponent 
            formType={activeForm} 
            onSubmit={(message) => handleFormSubmit(activeForm, message)} 
          />
        </FeedbackContainer>
      )}
      {submitted && message && (
        <CommentBox dangerouslySetInnerHTML={{ __html: message }} />
      )}
    </>
  );
};

const FormComponent = ({ formType, onSubmit }) => {
  switch (formType) {
    case 'IssueForm':
      return <IssueForm onSubmit={onSubmit} />;
    case 'FeedbackForm':
      return <FeedbackForm onSubmit={onSubmit} />;
    case 'SuggestionForm':
      return <SuggestionForm onSubmit={onSubmit} />;
    case 'ContactForm':
      return <ContactForm onSubmit={onSubmit} />;
    default:
      return null;
  }
};

const IssueForm = ({ onSubmit }) => {
  const [issueDetail, setIssueDetail] = useState('');
  const [section, setSection] = useState('');

  const handleInputChange = (event) => {
    setIssueDetail(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit('Thank you for reporting the issue!<br />We will review it and get back to you soon.');
  };

  return (
    <>
      <Typography variant="h6">Report an Issue</Typography>
      <Divider />
      <TextField
        label="Choose a section"
        fullWidth
        select
        value={section}
        onChange={handleSectionChange}
        required
      >
        <MenuItem value="Interview Questions">Interview Questions</MenuItem>
        <MenuItem value="Code Implementation">Code Implementation</MenuItem>
        <MenuItem value="UI/UX Issue">UI/UX Issue</MenuItem>
        <MenuItem value="Performance">Performance</MenuItem>
        <MenuItem value="Security">Security</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      <TextField
        label="Describe the issue in detail"
        fullWidth
        multiline
        rows={4}
        value={issueDetail}
        onChange={handleInputChange}
        required
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: issueDetail ? '#000000' : '#808080',
          color: '#ffffff',
        }}
        disabled={!issueDetail}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

const FeedbackForm = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit('Thank you for your valuable feedback');
  };

  return (
    <>
      <Typography variant="h6">Share Feedback</Typography>
      <Divider />
      <TextField
        label="Write here..."
        fullWidth
        multiline
        rows={4}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      />
      <FormControlLabel control={<Checkbox />} label="Send feedback anonymously" />
      <Button
        variant="contained"
        style={{
          backgroundColor: feedback ? '#000000' : '#808080',
          color: '#ffffff',
        }}
        disabled={!feedback}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

const SuggestionForm = ({ onSubmit }) => {
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = () => {
    onSubmit('Thank you for your valuable suggestion');
  };

  return (
    <>
      <Typography variant="h6">Give Suggestion</Typography>
      <Divider />
      <TextField
        label="Write here..."
        fullWidth
        multiline
        rows={4}
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        required
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: suggestion ? '#000000' : '#808080',
          color: '#ffffff',
        }}
        disabled={!suggestion}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSubmit('Thank you for reaching out to us!<br />We will get back to you as soon as possible.');
  };

  return (
    <>
      <Typography variant="h6">Contact Us</Typography>
      <Divider />
      <TextField
        label="Your Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Your Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Your Message"
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button
        variant="contained"
        style={{
          backgroundColor: (name && email && message) ? '#000000' : '#808080',
          color: '#ffffff',
        }}
        disabled={!(name && email && message)}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default FeedbackFab;
