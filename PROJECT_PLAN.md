# iSPEAK Platform - Complete Development Plan

## Current State Analysis

### Existing Infrastructure
- **Frontend**: Next.js 14 on Vercel (ispeak-app-prod.vercel.app)
- **Backend**: Express.js API on Hostinger VPS (72.61.201.237:3001)
- **Database**: MySQL 8.0 in Docker container
- **Domain**: ispeaklanguage.org (DNS propagating to Vercel)

### Existing Database Tables (Inferred from code)
- `users` - User accounts with roles (customer, educator, admin)
- `products` - Shop products
- `product_categories` - Product categories
- `orders` - Shop orders
- `order_items` - Order line items
- `carts` - Shopping carts
- `cart_items` - Cart line items
- `donations` - Donation records
- `blog_posts` - Blog articles
- `blog_categories` - Blog categories
- `educators` - Educator profiles (linked to users)
- `students` - Student profiles (linked to parent users)
- `enrollments` - Student enrollment in language programs
- `lessons` - Scheduled lessons
- `free_trial_requests` - Trial lesson requests
- `coupons` - Discount codes
- `media_library` - Uploaded media files
- `content_statistics` - Homepage statistics
- `hero_sections` - Homepage hero content
- `feature_cards` - Homepage feature cards

### Existing Pages (57 routes)
**Public Pages:**
- Homepage, About, Mission, Philosophy, Method
- Plans (main + language-specific: Yoruba, Twi, Kiswahili)
- Contact, FAQ, Free Trial, Group Rates
- Blog (list + individual posts)
- Shop (products + cart + checkout)
- Donate (main + confirm + thank-you + progress)
- Resources (free, culture, articles)
- Login, Register, Educator Login, Educator Apply
- Privacy, Terms

**Admin Pages:**
- Dashboard, Users, Products, Blog, Media, Content, Donations

### What's HARDCODED vs DYNAMIC

| Component | Current State | Needs |
|-----------|--------------|-------|
| Statistics Banner | Dynamic (with fallback) | OK |
| Hero Sections | Dynamic via API | OK |
| Feature Cards | Dynamic via API | OK |
| Homepage text sections | HARDCODED | Move to CMS |
| Plans/Pricing | HARDCODED | Create pricing_plans table |
| FAQ content | HARDCODED | Create FAQ table |
| Languages offered | HARDCODED | Create languages table |
| Method/Pillars | HARDCODED | Create content_blocks table |
| Testimonials | NOT EXISTS | Create testimonials table |
| Team members | NOT EXISTS | Create team_members table |

---

## PHASE 1: Database & Content Management Foundation
**Priority: HIGH | Timeline: Week 1**

### 1.1 New Database Tables Required

```sql
-- Languages offered
CREATE TABLE languages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  native_name VARCHAR(100),
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  flag_icon VARCHAR(255),
  region VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing Plans
CREATE TABLE pricing_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  billing_period ENUM('single', 'weekly', 'monthly', 'quarterly', 'yearly'),
  lessons_included INT,
  features JSON,
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ
CREATE TABLE faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  location VARCHAR(100),
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  avatar_url VARCHAR(500),
  language_id INT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Team Members
CREATE TABLE team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  bio TEXT,
  photo_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content Blocks (for CMS-managed content)
CREATE TABLE content_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL,
  block_key VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  subtitle VARCHAR(500),
  content TEXT,
  image_url VARCHAR(500),
  button_text VARCHAR(100),
  button_url VARCHAR(500),
  metadata JSON,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_block (page_slug, block_key)
);

-- Availability Schedule (for educators)
CREATE TABLE educator_availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  educator_id INT NOT NULL,
  day_of_week TINYINT NOT NULL, -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone VARCHAR(50) DEFAULT 'UTC',
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (educator_id) REFERENCES educators(id) ON DELETE CASCADE
);

-- Student Progress Tracking
CREATE TABLE student_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  language_id INT NOT NULL,
  skill_type ENUM('listening', 'speaking', 'vocabulary', 'culture') NOT NULL,
  level INT DEFAULT 1,
  points INT DEFAULT 0,
  last_activity_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (language_id) REFERENCES languages(id),
  UNIQUE KEY unique_progress (student_id, language_id, skill_type)
);

-- Learning Modules (LMS)
CREATE TABLE learning_modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  language_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  level ENUM('beginner', 'elementary', 'intermediate', 'advanced') NOT NULL,
  age_group ENUM('3-5', '6-8', '9-11', '12-14') NOT NULL,
  thumbnail_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Learning Lessons (within modules)
CREATE TABLE learning_lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  content JSON, -- Structured content: videos, text, exercises
  duration_minutes INT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES learning_modules(id) ON DELETE CASCADE,
  UNIQUE KEY unique_lesson (module_id, slug)
);

-- Student Lesson Completion
CREATE TABLE lesson_completions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  lesson_id INT NOT NULL,
  score INT,
  time_spent_seconds INT,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES learning_lessons(id) ON DELETE CASCADE,
  UNIQUE KEY unique_completion (student_id, lesson_id)
);

-- Notifications
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 1.2 API Routes to Create

**Content Management:**
- `GET/POST /api/languages` - Languages CRUD
- `GET/POST /api/pricing-plans` - Pricing plans CRUD
- `GET/POST /api/faqs` - FAQ CRUD
- `GET/POST /api/testimonials` - Testimonials CRUD
- `GET/POST /api/team-members` - Team CRUD
- `GET/POST /api/content-blocks` - Content blocks CRUD

**Admin Content Pages:**
- `/admin/content/languages` - Manage languages
- `/admin/content/pricing` - Manage pricing plans
- `/admin/content/faq` - Manage FAQs
- `/admin/content/testimonials` - Manage testimonials
- `/admin/content/team` - Manage team members
- `/admin/content/pages` - Manage page content blocks

---

## PHASE 2: Student Portal
**Priority: HIGH | Timeline: Week 2-3**

### Features:
1. **Dashboard**
   - Welcome message with student name
   - Upcoming lessons
   - Progress overview (charts)
   - Recent achievements/badges
   - Quick actions

2. **My Lessons**
   - Upcoming lessons calendar view
   - Past lessons history
   - Lesson materials/notes
   - Join lesson button (video meeting link)

3. **Learning Progress**
   - Skill breakdown (listening, speaking, vocabulary, culture)
   - Level indicators
   - Points/achievements
   - Badges earned

4. **Self-Study (LMS)**
   - Browse learning modules
   - Interactive lessons
   - Practice exercises
   - Quiz/assessment

5. **My Profile**
   - Avatar upload
   - Language preferences
   - Notification settings

### Pages to Create:
```
/student/dashboard
/student/lessons
/student/lessons/[id]
/student/progress
/student/learn
/student/learn/[moduleSlug]
/student/learn/[moduleSlug]/[lessonSlug]
/student/profile
/student/achievements
```

### API Endpoints:
```
GET  /api/student/dashboard
GET  /api/student/lessons
GET  /api/student/lessons/:id
GET  /api/student/progress
GET  /api/student/achievements
GET  /api/student/modules
GET  /api/student/modules/:slug
POST /api/student/lessons/:id/complete
PUT  /api/student/profile
```

---

## PHASE 3: Teacher/Educator Portal
**Priority: HIGH | Timeline: Week 3-4**

### Features:
1. **Dashboard**
   - Today's lessons
   - Weekly schedule overview
   - Student count
   - Earnings summary
   - Pending actions

2. **My Schedule**
   - Calendar view (day/week/month)
   - Set availability
   - View booked lessons
   - Lesson details

3. **My Students**
   - List of active students
   - Student profiles
   - Progress notes
   - Lesson history with each student

4. **Lesson Management**
   - Start lesson (generate meeting link)
   - End lesson + add notes
   - Mark attendance
   - Rate student performance

5. **Earnings**
   - Earnings history
   - Payout schedule
   - Tax documents

6. **Profile**
   - Bio and qualifications
   - Languages taught
   - Hourly rate
   - Profile photo

### Pages to Create:
```
/educator/dashboard
/educator/schedule
/educator/availability
/educator/students
/educator/students/[id]
/educator/lessons/[id]
/educator/earnings
/educator/profile
```

### API Endpoints:
```
GET  /api/educator/dashboard
GET  /api/educator/schedule
POST /api/educator/availability
GET  /api/educator/students
GET  /api/educator/students/:id
PUT  /api/educator/lessons/:id/start
PUT  /api/educator/lessons/:id/complete
GET  /api/educator/earnings
PUT  /api/educator/profile
```

---

## PHASE 4: Lesson Booking System
**Priority: HIGH | Timeline: Week 4-5**

### Features:
1. **Browse Educators**
   - Filter by language
   - Filter by availability
   - Sort by rating/experience
   - View profiles

2. **Educator Profile Page**
   - Full bio
   - Languages & levels
   - Availability calendar
   - Reviews/ratings
   - Book lesson button

3. **Booking Flow**
   - Select language
   - Select child (if multiple)
   - Choose date/time slot
   - Confirm & pay (or use credits)
   - Confirmation email

4. **Reschedule/Cancel**
   - Reschedule policy (24hr notice)
   - Cancel with refund policy
   - Notification to educator

### Pages to Create:
```
/educators
/educators/[slug]
/book/[educatorSlug]
/book/confirm
/book/success
```

### API Endpoints:
```
GET  /api/educators
GET  /api/educators/:slug
GET  /api/educators/:id/availability
POST /api/bookings
PUT  /api/bookings/:id/reschedule
PUT  /api/bookings/:id/cancel
```

---

## PHASE 5: Parent Portal
**Priority: HIGH | Timeline: Week 5-6**

### Features:
1. **Dashboard**
   - Children overview
   - Upcoming lessons
   - Recent activity
   - Subscription status

2. **My Children**
   - Add/manage children profiles
   - View each child's progress
   - Lesson history per child

3. **Lessons & Bookings**
   - Book new lessons
   - View upcoming lessons
   - Cancel/reschedule
   - Lesson feedback

4. **Billing & Subscription**
   - Current plan
   - Payment history
   - Manage payment methods
   - Upgrade/downgrade plan

5. **Messages**
   - Chat with educators
   - Support messages

### Pages to Create:
```
/parent/dashboard
/parent/children
/parent/children/add
/parent/children/[id]
/parent/lessons
/parent/book
/parent/billing
/parent/messages
/parent/settings
```

### API Endpoints:
```
GET  /api/parent/dashboard
GET  /api/parent/children
POST /api/parent/children
PUT  /api/parent/children/:id
GET  /api/parent/lessons
GET  /api/parent/billing
PUT  /api/parent/billing/method
GET  /api/parent/messages
POST /api/parent/messages
```

---

## PHASE 6: LMS (Learning Management System)
**Priority: MEDIUM | Timeline: Week 6-7**

### Features:
1. **Learning Modules**
   - Organized by language
   - Age-appropriate content
   - Progressive difficulty

2. **Lesson Types**
   - Video lessons
   - Interactive vocabulary
   - Listening exercises
   - Speaking practice (record & compare)
   - Cultural content
   - Games & quizzes

3. **Progress Tracking**
   - Completion percentage
   - Quiz scores
   - Time spent
   - Streak tracking

4. **Gamification**
   - Points system
   - Badges/achievements
   - Leaderboards (optional)
   - Daily challenges

### Admin Features:
```
/admin/lms/modules
/admin/lms/modules/new
/admin/lms/modules/[id]/lessons
/admin/lms/modules/[id]/lessons/new
```

---

## PHASE 7: Homepage & Design Alignment
**Priority: MEDIUM | Timeline: Week 7-8**

### Hardcoded Content to Migrate:

1. **Video Section** - Move to content_blocks
2. **Mission Section** - Move to content_blocks
3. **Paji Shop Section** - Move to content_blocks
4. **Plans Section** - Use pricing_plans table
5. **iSPEAK Method** - Move to content_blocks
6. **Three Pillars** - Move to content_blocks
7. **Language Offerings** - Use languages table
8. **Testimonials** - Use testimonials table
9. **FAQ** - Use faqs table

### Admin Content Editor:
- WYSIWYG editor for content blocks
- Image upload integration with media library
- Preview before publish

---

## PHASE 8: Additional Features
**Priority: LOW | Timeline: Week 8+**

1. **Email Notifications**
   - Lesson reminders (24hr, 1hr before)
   - Booking confirmations
   - Progress reports (weekly)
   - Marketing emails

2. **SMS Notifications** (optional)
   - Lesson reminders
   - Last-minute changes

3. **Video Integration**
   - Zoom/Google Meet integration
   - In-app video (future)

4. **Mobile App** (future)
   - React Native app
   - Push notifications

5. **Analytics Dashboard**
   - User growth
   - Lesson metrics
   - Revenue reports
   - Educator performance

---

## Implementation Priority Order

### Week 1: Foundation
- [ ] Create all new database tables
- [ ] Create content management API routes
- [ ] Create admin content management pages
- [ ] Migrate hardcoded homepage content to database

### Week 2: Authentication & Roles
- [ ] Enhance user roles (parent, student, educator)
- [ ] Role-based routing middleware
- [ ] Parent-student relationship management

### Week 3: Student Portal
- [ ] Student dashboard
- [ ] Lessons view
- [ ] Basic progress tracking

### Week 4: Educator Portal
- [ ] Educator dashboard
- [ ] Schedule management
- [ ] Availability settings

### Week 5: Booking System
- [ ] Educator browsing
- [ ] Booking flow
- [ ] Payment integration

### Week 6: Parent Portal
- [ ] Parent dashboard
- [ ] Children management
- [ ] Billing integration

### Week 7: LMS Foundation
- [ ] Learning modules structure
- [ ] Basic lesson content
- [ ] Progress tracking

### Week 8: Polish & Launch
- [ ] Homepage content migration complete
- [ ] Email notifications
- [ ] Testing & bug fixes
- [ ] Production deployment

---

## Technical Notes

### Authentication Flow:
1. Parent registers -> Creates user (role: customer)
2. Parent adds children -> Creates student records linked to parent
3. Educator applies -> Creates user + educator record (pending)
4. Admin approves educator -> Updates educator status + user role

### Lesson Credits System:
- Parents purchase plans (credits)
- Credits deducted when booking lessons
- Credits can expire based on plan
- Refund credits for cancellations (with policy)

### Video Meeting Integration:
- Option 1: Generate Zoom/Meet links via API
- Option 2: Use embedded video solution (Daily.co, Whereby)
- Store meeting_url in lessons table

---

## Files to Modify

### Backend Routes to Create:
1. `/backend/src/routes/languages.js`
2. `/backend/src/routes/pricing.js`
3. `/backend/src/routes/faqs.js`
4. `/backend/src/routes/testimonials.js`
5. `/backend/src/routes/team.js`
6. `/backend/src/routes/content.js`
7. `/backend/src/routes/student.js`
8. `/backend/src/routes/educator.js`
9. `/backend/src/routes/parent.js`
10. `/backend/src/routes/booking.js`
11. `/backend/src/routes/lms.js`
12. `/backend/src/routes/notifications.js`

### Frontend Pages to Create:
See each phase above for complete list.

### Components to Create:
1. `StudentDashboard.js`
2. `EducatorDashboard.js`
3. `ParentDashboard.js`
4. `LessonCalendar.js`
5. `BookingWidget.js`
6. `ProgressChart.js`
7. `EducatorCard.js`
8. `StudentCard.js`
9. `LessonCard.js`
10. `ModuleCard.js`
11. `AchievementBadge.js`
12. `ContentBlockEditor.js`

---

## Success Metrics

1. **Student Portal**: Student can log in, view lessons, track progress
2. **Teacher System**: Educator can manage schedule, conduct lessons
3. **Lesson Booking**: Parent can browse educators, book lessons
4. **LMS**: Student can access self-study modules
5. **Parent Portal**: Parent can manage children, view progress, pay

---

*Document created: December 8, 2025*
*Last updated: December 8, 2025*
