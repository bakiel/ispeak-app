# Client Corrections Summary - iSPEAK Website

## Overview
This document summarizes all client-requested corrections that need to be implemented on the iSPEAK website.

## Priority 1: High Priority Corrections

### 1. Contact Information Update ✅
**File:** updates/contact-information-updates.md
**Current Issue:** Wrong address showing (Washington, DC)
**Correction Needed:**
- Change from: 123 Education Boulevard, Washington, DC 20001
- Change to: P.O. Box 4511, Macon, Georgia 31213
- Phone: +1 (478) 390-4040
- Email: privacy@ispeaklanguage.org

**Locations to Update:**
- [ ] Privacy Policy page
- [ ] Website footer
- [ ] Contact page
- [ ] About page
- [ ] Terms of Service

### 2. Mission Section Content Update ✅
**File:** updates/mission-content-updates.md
**Current Issue:** Mission section has detailed content about PanAfrican efforts
**Correction Needed:**
Replace current detailed paragraph with:
> "iSPEAK has partnered with several community-based organizations and initiatives to support efforts aligned with our mission of preserving and promoting African languages and cultures. Through these collaborative partnerships, we work together to strengthen indigenous language communities and create meaningful educational opportunities."

**Actions:**
- [ ] Update mission section text
- [ ] Ensure "Support Our Mission" button links to donation page
- [ ] Remove mentions of Repat Assistance Program and Ghana

### 3. Donation System Implementation ✅
**File:** updates/donation-system-updates.md
**New Feature Required:** Complete donation system with 3 categories

**Donation Categories:**
1. Family World School Cooperative Learners (FWS)
2. FWS Partner Schools
3. Language Councils

**Requirements:**
- [ ] One-time donations (increments of $5: $5, $10, $15, etc.)
- [ ] Monthly recurring donations (minimum $5)
- [ ] Multiple category selection per transaction
- [ ] $5 optional community contribution during plan purchase
- [ ] Anonymous donation option

## Priority 2: Medium Priority Corrections

### 4. Educational Philosophy Content Update
**File:** updates/educational-philosophy-updates.md
**Correction Needed:**
Change from:
> "Our approach centers on creating positive associations with heritage languages through play, stories, and meaningful connections."

To:
> "Our approach centers on creating positive associations with heritage languages using immersion through play, stories, and meaningful communication."

### 5. Name Pronunciation Feature Highlight
**File:** updates/educational-philosophy-updates.md
**New Content to Add:**
> "Parents may struggle with pronouncing African names correctly, especially for names with tonal elements. Having a native speaker record their child's name is invaluable. It takes the educator just a minute or two to record, but provides lasting value to families."

**Requirements:**
- [ ] Add to Features/Services page
- [ ] Show 150 points value (Explorer tier+)
- [ ] Add to pricing tier descriptions

## Implementation Order

1. **Phase 1: Content Corrections** (Do First)
   - Update all contact information
   - Update mission section content
   - Update educational philosophy text
   - Add name pronunciation feature content

2. **Phase 2: Donation System** (Do Second)
   - Build donation page with 3 categories
   - Implement payment processing
   - Add $5 community contribution to plan purchase
   - Create donation management system

3. **Phase 3: Testing & Verification**
   - Test all updated content
   - Verify all contact info is correct
   - Test donation system functionality
   - Client review and approval

## Files to Check/Update

### In ispeak-language-copy project:
- [ ] app/page.js (home page - mission section)
- [ ] components/Footer.js (contact info)
- [ ] app/contact/page.js (if exists)
- [ ] app/about/page.js (if exists)
- [ ] app/privacy/page.js (if exists)
- [ ] app/educational-philosophy/page.js (if exists)
- [ ] app/donate/page.js (needs creation)

## Next Steps

1. Start with contact information updates (highest priority)
2. Update mission section content
3. Update educational philosophy content
4. Begin donation system implementation
5. Get client approval at each phase

---
Last Updated: January 28, 2025
Status: Ready for Implementation