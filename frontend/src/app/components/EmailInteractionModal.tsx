import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { sendEmailInquiry } from '../lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface EmailInteractionModalProps {
  selectedEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface EmailFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const defaultFormState: EmailFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function EmailInteractionModal({ selectedEmail, open, onOpenChange }: EmailInteractionModalProps) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showMailProviders, setShowMailProviders] = useState(false);
  const [formData, setFormData] = useState<EmailFormState>(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (open) {
      setShowFormModal(false);
      setShowMailProviders(false);
      setFormData(defaultFormState);
      setSuccessMessage('');
      setErrorMessage('');
    }
  }, [open]);

  const handleContinueOnWebsite = () => {
    setShowFormModal(true);
    setShowMailProviders(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleOpenMailApp = () => {
    setShowMailProviders(true);
    setShowFormModal(false);
  };

  const handleOpenProvider = (provider: 'gmail' | 'yahoo' | 'outlook') => {
    const subject = encodeURIComponent('Inquiry');
    const body = encodeURIComponent('Hello');
    const to = encodeURIComponent(selectedEmail);

    const composeUrlByProvider = {
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      yahoo: `https://compose.mail.yahoo.com/?to=${to}&subject=${subject}&body=${body}`,
      outlook: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${subject}&body=${body}`,
    };

    const targetUrl = composeUrlByProvider[provider];
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCloseAll = (nextOpen: boolean) => {
    if (!nextOpen) {
      setShowFormModal(false);
      setShowMailProviders(false);
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await sendEmailInquiry({
        architectEmail: selectedEmail,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSuccessMessage('Your message has been sent successfully.');
      setFormData(defaultFormState);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open && !showFormModal} onOpenChange={handleCloseAll}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose how to continue</DialogTitle>
            <DialogDescription>
              Contact {selectedEmail} using your mail app or continue directly on this website.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleContinueOnWebsite}
              className="w-full rounded-md bg-[#2B2B2B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black"
            >
              Continue on Website
            </button>
            <button
              type="button"
              onClick={handleOpenMailApp}
              className="w-full rounded-md border border-[#D9D9D9] px-4 py-2 text-sm font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F5]"
            >
              Open in Mail App
            </button>

            {showMailProviders ? (
              <div className="pt-2">
                <p className="mb-2 text-xs text-[#2B2B2B]/70">Choose your email provider</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => handleOpenProvider('gmail')}
                    className="rounded-md border border-[#D9D9D9] px-3 py-2 text-sm font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F5]"
                  >
                    Gmail
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenProvider('yahoo')}
                    className="rounded-md border border-[#D9D9D9] px-3 py-2 text-sm font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F5]"
                  >
                    Yahoo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenProvider('outlook')}
                    className="rounded-md border border-[#D9D9D9] px-3 py-2 text-sm font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F5]"
                  >
                    Outlook
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open && showFormModal}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            handleCloseAll(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send message to {selectedEmail}</DialogTitle>
            <DialogDescription>
              Fill in your details and message. We will send this inquiry to the selected architect email.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {successMessage ? (
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{successMessage}</p>
            ) : null}
            {errorMessage ? (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
            ) : null}

            <div>
              <label htmlFor="footer-email-name" className="mb-1 block text-sm font-medium text-[#2B2B2B]">
                Name
              </label>
              <input
                id="footer-email-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-md border border-[#D9D9D9] px-3 py-2 text-sm text-[#2B2B2B] outline-none focus:border-[#f3e218]"
              />
            </div>

            <div>
              <label htmlFor="footer-email-email" className="mb-1 block text-sm font-medium text-[#2B2B2B]">
                Email
              </label>
              <input
                id="footer-email-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-md border border-[#D9D9D9] px-3 py-2 text-sm text-[#2B2B2B] outline-none focus:border-[#f3e218]"
              />
            </div>

            <div>
              <label htmlFor="footer-email-subject" className="mb-1 block text-sm font-medium text-[#2B2B2B]">
                Subject
              </label>
              <input
                id="footer-email-subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full rounded-md border border-[#D9D9D9] px-3 py-2 text-sm text-[#2B2B2B] outline-none focus:border-[#f3e218]"
              />
            </div>

            <div>
              <label htmlFor="footer-email-message" className="mb-1 block text-sm font-medium text-[#2B2B2B]">
                Message
              </label>
              <textarea
                id="footer-email-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full rounded-md border border-[#D9D9D9] px-3 py-2 text-sm text-[#2B2B2B] outline-none focus:border-[#f3e218]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-[#f3e218] px-4 py-2 text-sm font-medium text-[#2B2B2B] transition-colors hover:bg-[#dfd014] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
