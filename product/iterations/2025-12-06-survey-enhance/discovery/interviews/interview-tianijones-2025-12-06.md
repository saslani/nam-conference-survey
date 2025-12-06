# Interview: Survey Chat Enhancement Discovery

**Date**: 2025-12-06
**Participant**: Tiani Jones
**Role**: Product Owner
**Duration**: ~15 minutes
**Interviewer**: Claude (AI)

## Interview Context

This interview was conducted to understand the requirements for adding conversational voice input to the NAM Conference Survey application.

---

## Key Findings

### Business Driver & Problem Statement

**Primary Goal**: Enable a semi-hands-free survey experience where users can speak their responses naturally and have the form automatically populate.

**User Problem**: Users want to answer survey questions out loud in their own voice rather than manually filling in form fields. This is particularly useful for conference attendees who may be mobile or multitasking.

**Success Criteria**: Quick prototype (30-minute timeline) for user testing to validate the concept.

---

## Feature Requirements

### Core Functionality

**Interaction Model**:
- **Hybrid approach**: Form remains visible while voice input fills it in
- Users can see the form populate in real-time as they speak
- Audio input converts to text, which intelligently maps to form fields

**Audio Recording**:
- Tap to start recording
- Tap again to stop recording
- Simple recording indicator (no complex waveforms)
- Browser-based speech recognition (Web Speech API)

**User Experience**:
- Show only populated form fields (not raw transcript)
- Users manually edit form fields if corrections needed
- No explicit confirmation step - populate directly and let users review

### Scope

**Coverage**: All 19 survey question types must be supported

**Question Types to Handle**:
- Likert scales
- Multiple select
- Ranking questions
- Open-ended text responses
- Binary yes/no
- Rating scales

---

## Technical Approach

### Speech Recognition
- **Technology**: Browser-based Web Speech API
- **Rationale**: No server-side processing required, maintains anonymity, zero-cost
- **Trade-offs**: Limited to Chrome/Edge for best support, less accurate than cloud services

### Intelligent Field Mapping
- **Challenge**: Map free-form speech to specific survey questions
- **Approach**: [To be determined based on Q46 - LLM API, keyword matching, or mock]
- **Example**: User says "I loved the keynote, 5 stars" → system fills keynote rating field with 5

### Implementation Priority
- **Timeline**: 30-minute rapid prototype
- **Focus**: Core functionality over polish
- **Acceptable limitations**:
  - Chrome/Edge only
  - Imperfect accuracy (concept testing)
  - Some edge cases may not be handled

---

## Direct Quotes

> "when a user is filling in a survey, it is helpful to be able to answer questions out loud in their own voice, and have a semi-hands-free experience."

> "it should be a hybrid where the form remains visible and the chat fills it in."

> "we want to add audio option to intake a response and convert it to text to fill in the form"

> "success in this case is a quick prototype that we can test with users. 30 minute timeline."

---

## User Experience Flow (Inferred)

1. User lands on survey page
2. Sees traditional form + new "Record Audio" button
3. Taps button to start recording (indicator shows "Recording...")
4. Speaks naturally: "The keynote was amazing, I'd give it a 5. Venue was great too, also a 5. But parking was terrible, maybe a 2."
5. Taps button to stop recording
6. System transcribes audio to text
7. System intelligently extracts responses and maps to correct form fields
8. Form fields populate automatically
9. User reviews populated fields
10. User can manually edit any incorrect fields
11. User submits survey as normal

---

## Open Questions

**Q46**: For intelligent mapping - LLM API, keyword matching, or mock data?
**Q47**: Mobile-only or desktop too?
**Q48**: Acceptable limitations for prototype?

(These will be answered as implementation begins)

---

## Design Considerations

### Privacy & Anonymity
- Browser-based processing maintains survey anonymity
- No audio stored on server
- Transcription happens client-side

### Accessibility
- Semi-hands-free helps users who are multitasking
- Could benefit users with motor impairments
- Voice input may be easier than typing on mobile

### Mobile-First
- Survey is already mobile-optimized
- Voice input particularly valuable on mobile devices
- Tap interaction works well on touchscreens

---

## Success Metrics (Suggested)

For prototype testing:
- Can users successfully record and populate at least 5 questions?
- Is the mapping accuracy good enough to be useful?
- Do users prefer voice vs traditional input?
- How many fields require manual correction?
- Time to complete: voice vs manual?

---

## Next Steps

1. Answer remaining technical questions (Q46-Q48)
2. Implement rapid prototype (30-minute timeline)
3. Test with users
4. Gather feedback
5. Iterate based on learnings

---

## Tags

#voice-input #speech-to-text #survey-enhancement #mvp #prototype #mobile-first #hands-free #web-speech-api #hybrid-ui #conversational-ui
