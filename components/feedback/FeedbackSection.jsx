"use client";

import { useState } from "react";
import {
  attachFeedbackEmail,
  submitFeedback,
} from "../../services/feedbackService";
import {
  PUBLIC_EVENT_TYPES,
  trackPortfolioEvent,
} from "../../services/analyticsService";
import ApprovedFeedbackShowcase from "./ApprovedFeedbackShowcase";
import FireworksCelebration from "./FireworksCelebration";

const initialFormState = {
  name: "",
  anonymous: false,
  message: "",
};

const FeedbackSection = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [emailPromptVisible, setEmailPromptVisible] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [submittedFeedbackId, setSubmittedFeedbackId] = useState("");
  const [submittedEmailToken, setSubmittedEmailToken] = useState("");
  const [submittedDisplayName, setSubmittedDisplayName] = useState("friend");
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [wantsReplyEmail, setWantsReplyEmail] = useState(false);
  const [optionalEmail, setOptionalEmail] = useState("");

  const onInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");

    try {
      const result = await submitFeedback(formValues);
      await trackPortfolioEvent(PUBLIC_EVENT_TYPES.FEEDBACK_SUBMITTED, {
        pagePath: "/",
      });
      setSubmittedFeedbackId(result.feedbackId);
      setSubmittedEmailToken(result.emailToken);
      setSubmittedDisplayName(result.displayName);
      setCelebrationMessage(
        result.anonymous
          ? "Thank you, mysterious internet person. 👀"
          : `Thank you, ${result.displayName}! 💗`,
      );
      setShowCelebration(true);
      setNotice(
        `Thank you, ${result.displayName}. Your feedback has been submitted.`,
      );

      if (wantsReplyEmail && optionalEmail.trim()) {
        try {
          await attachFeedbackEmail({
            feedbackId: result.feedbackId,
            email: optionalEmail,
            emailToken: result.emailToken,
          });
          setNotice(
            `Thank you, ${result.displayName}. Your feedback has been submitted and your email was saved.`,
          );
          setEmailPromptVisible(false);
        } catch {
          setEmailPromptVisible(true);
        }
      } else {
        setEmailPromptVisible(false);
      }

      setFormValues(initialFormState);
      setWantsReplyEmail(false);
      setOptionalEmail("");
    } catch (submitError) {
      setError(submitError.message || "Unable to submit feedback right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const onSaveOptionalEmail = async (event) => {
    event.preventDefault();
    if (!submittedFeedbackId || !submittedEmailToken) return;

    setSavingEmail(true);
    setError("");
    setNotice("");

    try {
      await attachFeedbackEmail({
        feedbackId: submittedFeedbackId,
        email: emailInput,
        emailToken: submittedEmailToken,
      });
      setNotice("Awesome. If I reply, you will receive an email.");
      setEmailInput("");
      setEmailPromptVisible(false);
    } catch (saveError) {
      setError(saveError.message || "Unable to save email right now.");
    } finally {
      setSavingEmail(false);
    }
  };

  return (
    <>
      <FireworksCelebration
        show={showCelebration}
        message={celebrationMessage}
        onComplete={() => {
          setShowCelebration(false);
          setEmailPromptVisible(true);
        }}
      />
      <section
        name="feedback"
        className="w-full md:min-h-screen bg-black text-[#FDE7EF] flex justify-center items-center p-4"
      >
        <div className="max-w-[1000px] w-full py-8">
          <ApprovedFeedbackShowcase />

          <form
            onSubmit={onSubmit}
            className="flex flex-col max-w-[600px] w-full mx-auto pt-20"
          >
            <div className="pb-8">
              <p className="text-4xl font-bold inline border-b-4 border-primary">
                What do you think of my portfolio?
              </p>
              <p className="py-4 text-accent">
                Share honest feedback. Your email is private and will not be
                displayed.
              </p>
            </div>

            <label className="flex items-center gap-3 my-2 text-accent">
              <input
                type="checkbox"
                name="anonymous"
                checked={formValues.anonymous}
                onChange={onInputChange}
                disabled={submitting}
                className="h-4 w-4 accent-primary"
              />
              Submit anonymously
            </label>

            {!formValues.anonymous ? (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={onInputChange}
                disabled={submitting}
                className="p-2 bg-secondary rounded-lg text-black placeholder:text-black disabled:opacity-70"
              />
            ) : null}

            <label className="flex items-center gap-3 my-2 text-accent">
              <input
                type="checkbox"
                checked={wantsReplyEmail}
                onChange={(event) => setWantsReplyEmail(event.target.checked)}
                disabled={submitting}
                className="h-4 w-4 accent-primary"
              />
              Want to see my reply? Leave your email.
            </label>

            {wantsReplyEmail ? (
              <input
                type="email"
                value={optionalEmail}
                onChange={(event) => setOptionalEmail(event.target.value)}
                placeholder="Email (optional)"
                disabled={submitting}
                className="p-2 bg-secondary rounded-lg text-black placeholder:text-black disabled:opacity-70 mb-3"
              />
            ) : null}

            <textarea
              name="message"
              placeholder="Type your feedback here"
              rows="6"
              value={formValues.message}
              onChange={onInputChange}
              disabled={submitting}
              className="bg-secondary p-2 rounded-lg text-black placeholder:text-black"
            />

            {notice ? <p className="text-green-300 mt-4">{notice}</p> : null}
            {error ? <p className="text-red-300 mt-4">{error}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="border-2 bg-secondary hover:bg-secondary hover:text-black px-4 py-3 my-8 mx-auto flex items-center rounded-lg disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>

          {emailPromptVisible ? (
            <form
              onSubmit={onSaveOptionalEmail}
              className="max-w-[600px] w-full mx-auto rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-4"
            >
              <p className="text-lg font-semibold">
                Want to see my reply, {submittedDisplayName}?
              </p>
              <p className="text-accent text-sm mt-1">
                Leave your email (optional).
              </p>
              <div className="mt-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                  placeholder="Email (private)"
                  disabled={savingEmail}
                  className="flex-1 p-2 bg-secondary rounded-lg text-black placeholder:text-black"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={savingEmail || !emailInput.trim()}
                    className="border-2 border-secondary bg-secondary text-black px-4 py-2 rounded-lg disabled:opacity-70"
                  >
                    {savingEmail ? "Saving..." : "Save Email"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailPromptVisible(false)}
                    className="border-2 px-4 py-2 rounded-lg"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </form>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default FeedbackSection;
