# Iteration Discovery: 2025-12-06-survey-enhance

**Started**: 2025-12-06
**Focus**: Survey chat. Ability to chat with the survey and automatically fill in the form.
**Status**: Active

## Goals

Enable voice input for survey responses with intelligent form auto-population:
- Semi-hands-free survey experience for conference attendees
- Audio recording (tap to start/stop) with browser-based speech-to-text
- Intelligent mapping of spoken responses to form fields
- Hybrid UI: form remains visible and populates in real-time
- Support all 19 question types
- **30-minute rapid prototype for user testing**

## Research Methods

- [x] AI-guided stakeholder interview (Tiani Jones - 2025-12-06)
- [ ] Technical observations
- [ ] User testing with prototype

## Timeline

- **Start**: 2025-12-06
- **Target prototype**: 30 minutes from interview completion
- **Target synthesis**: After user testing feedback

## Key Decisions

### Interaction Model
- **Hybrid approach**: Form visible + voice input fills it (not form replacement)
- **Recording**: Tap to start/stop (not push-to-talk or continuous)
- **Feedback**: Simple recording indicator, show populated fields only (not transcript)
- **Correction**: Manual editing of form fields (not voice correction)

### Technical Approach
- **Speech Recognition**: Browser-based Web Speech API (Chrome/Edge)
- **Field Mapping**: [TBD - LLM API vs keyword matching vs mock]
- **Scope**: All 19 questions, prototype-quality accuracy acceptable

### Success Criteria
- Working prototype in 30 minutes
- Testable with real users
- Concept validation > production polish

## Notes

**User Need**: "when a user is filling in a survey, it is helpful to be able to answer questions out loud in their own voice, and have a semi-hands-free experience."

**Key Insight**: This is particularly valuable for mobile users and conference attendees who are multitasking or on-the-go.

**Privacy Preservation**: Browser-based processing maintains survey anonymity - no audio sent to server.

**Open Questions**:
- Intelligent mapping approach (Q46)
- Platform priority - mobile/desktop (Q47)
- Acceptable prototype limitations (Q48)

See detailed interview notes: `discovery/interviews/interview-tianijones-2025-12-06.md`
