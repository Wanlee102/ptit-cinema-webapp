# Translation Flow & Examples

This document provides a comprehensive guide for translating hardcoded strings in the aicademy frontend application using Paraglide JS internationalization system.

## Overview

The application uses **Paraglide JS** for internationalization with the following structure:
- Translation messages are stored in JSON files: `messages/en.json` and `messages/vi.json`
- Components import translation functions from `@/paraglide/messages.js`
- Translation functions must be called **inside React components**, not at module level

## Translation Flow

### 1. Identify Hardcoded Strings
Look for strings that should be translated in:
- Component JSX elements
- Static arrays and objects defined at module level
- Error messages and user-facing text
- Form labels, placeholders, and validation messages

### 2. Add Translation Keys
Add corresponding keys to both language JSON files:

**messages/en.json**
```json
{
  "courses": {
    "all_courses": "All courses",
    "sort_newest": "Newest"
  }
}
```

**messages/vi.json**
```json
{
  "courses": {
    "all_courses": "Tất cả khóa học", 
    "sort_newest": "Mới nhất"
  }
}
```

### 3. Import Translation Function
Add import at the top of your component file:
```tsx
import * as m from "@/paraglide/messages.js";
```

### 4. Replace Hardcoded Strings
Replace hardcoded strings with translation function calls:
```tsx
// Before
<h1>All courses</h1>

// After  
<h1>{m["courses.all_courses"]()}</h1>
```

### 5. Handle Module-Level Constants
Move translation calls inside React components:

```tsx
// ❌ Wrong - at module level
const sortOptions = [
  { value: "newest", label: m["courses.sort_newest"]() }
];

// ✅ Correct - inside component
export function CourseFilters() {
  const sortOptions = [
    { value: "newest", label: m["courses.sort_newest"]() }
  ];
  // ...
}
```

## Practical Examples

### Example 1: Basic Component Translation

**Before:**
```tsx
function WelcomeMessage() {
  return (
    <div>
      <h1>Welcome to aicademy</h1>
      <p>Start your learning journey today</p>
    </div>
  );
}
```

**After:**
```tsx
import * as m from "@/paraglide/messages.js";

function WelcomeMessage() {
  return (
    <div>
      <h1>{m["welcome.title"]()}</h1>
      <p>{m["welcome.description"]()}</p>
    </div>
  );
}
```

**JSON files:**
```json
{
  "welcome": {
    "title": "Welcome to aicademy",
    "description": "Start your learning journey today"
  }
}
```

```json
{
  "welcome": {
    "title": "Chào mừng đến với aicademy",
    "description": "Bắt đầu hành trình học tập của bạn ngay hôm nay"
  }
}
```

### Example 2: Dynamic Content with useMemo

**Before:**
```tsx
function CourseActionButton({ isCompleted, userCourse }) {
  const getButtonText = () => {
    if (isCompleted) return "Revise";
    if (!userCourse) return "Start Learning";
    return "Continue Learning";
  };

  return <button>{getButtonText()}</button>;
}
```

**After:**
```tsx
import * as m from "@/paraglide/messages.js";

function CourseActionButton({ isCompleted, userCourse }) {
  const buttonText = useMemo(() => {
    if (isCompleted) return m["courses.revise"]();
    if (!userCourse) return m["courses.start_learning"]();
    return m["courses.continue_learning"]();
  }, [isCompleted, userCourse]);

  return <button>{buttonText}</button>;
}
```

### Example 3: Form Component Translation

**Before:**
```tsx
function LoginForm() {
  return (
    <form>
      <label>Email Address</label>
      <input placeholder="Enter your email" />
      <label>Password</label>
      <input placeholder="Enter your password" type="password" />
      <button>Login</button>
    </form>
  );
}
```

**After:**
```tsx
import * as m from "@/paraglide/messages.js";

function LoginForm() {
  return (
    <form>
      <label>{m["auth.email_label"]()}</label>
      <input placeholder={m["auth.email_placeholder"]()} />
      <label>{m["auth.password_label"]()}</label>
      <input placeholder={m["auth.password_placeholder"]()} type="password" />
      <button>{m["auth.login_button"]()}</button>
    </form>
  );
}
```

### Example 4: Complex Data Structure Translation

**Before:**
```tsx
const FAQ_DATA = [
  {
    question: "What is aicademy?",
    answer: "A modern learning platform"
  },
  {
    question: "How do I get started?", 
    answer: "Create an account and browse courses"
  }
];

function FAQ() {
  return (
    <div>
      {FAQ_DATA.map((item, index) => (
        <div key={index}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
```

**After:**
```tsx
import * as m from "@/paraglide/messages.js";

function FAQ() {
  const faqData = [
    {
      question: m["faq.what_is_aicademy.question"](),
      answer: m["faq.what_is_aicademy.answer"]()
    },
    {
      question: m["faq.how_to_start.question"](),
      answer: m["faq.how_to_start.answer"]()
    }
  ];

  return (
    <div>
      {faqData.map((item, index) => (
        <div key={index}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 5: Help Center Data Translation

For complex data structures like help center content, use separate data files:

**Before:**
```tsx
// src/data/help-center-en.ts
export const helpCenterData = [
  {
    id: "courses",
    title: "Courses",
    description: "Learn about our courses",
    items: [
      {
        question: "How long are courses?",
        answer: "Courses vary from 30-120 minutes"
      }
    ]
  }
];
```

**After:**
The help center approach uses locale-specific data files that are already structured for internationalization. This pattern is ideal for large, complex content that doesn't change frequently.

## Best Practices

### 1. Translation Key Naming
- Use nested structure: `"section.subsection.key"`
- Use descriptive names: `"courses.lesson_completion.great_job_message"`
- Group related keys: `"auth.*"`, `"courses.*"`, `"profile.*"`

### 2. Component Context
```tsx
// ❌ Wrong - module level
const ERROR_MESSAGE = m["errors.general"]();

// ✅ Correct - inside component
function ErrorComponent() {
  const errorMessage = m["errors.general"]();
  return <div>{errorMessage}</div>;
}
```

### 3. Dynamic Content Handling
```tsx
// ✅ Good - using useMemo for dynamic content
const buttonText = useMemo(() => {
  if (condition1) return m["action.option1"]();
  if (condition2) return m["action.option2"]();
  return m["action.default"]();
}, [condition1, condition2]);
```

### 4. Conditional Rendering
```tsx
// ✅ Good - direct translation calls in JSX
{isError && <div>{m["errors.network"]()}</div>}
{isLoading ? m["common.loading"]() : m["common.ready"]()}
```

## Testing Translation Changes

### 1. Build Verification
Always run the build after making translation changes:
```bash
npm run build
```

### 2. Check for Missing Keys
If a translation key is missing, the build will succeed but the key name will be displayed instead of the translated text.

### 3. Verify Both Languages
Test the application in both English and Vietnamese to ensure all translations are working:
- Toggle language using the language switcher
- Navigate through translated components
- Check for any untranslated strings

## Common Patterns

### 1. Error Messages
```tsx
// Error boundaries and API errors
{error && <div className="error">{m["errors.general"]()}</div>}
```

### 2. Loading States
```tsx
// Loading indicators
{isLoading ? m["common.loading"]() : content}
```

### 3. Navigation Items
```tsx
// Navigation menus
const navItems = [
  { href: "/courses", label: m["navigation.courses"]() },
  { href: "/dashboard", label: m["navigation.dashboard"]() }
];
```

### 4. Form Validation
```tsx
// Form validation messages
const errors = {
  email: email ? null : m["validation.email_required"](),
  password: password ? null : m["validation.password_required"]()
};
```

## Troubleshooting

### Build Errors
- **"Unterminated regular expression"**: Check for unescaped characters in JSX
- **"ReferenceError: m is not defined"**: Missing import statement
- **"Cannot read property of undefined"**: Translation key doesn't exist in JSON files

### Runtime Issues
- **Key name displayed instead of translation**: Key missing in JSON file
- **Empty translation**: Key exists but value is empty string
- **Wrong language displayed**: Check locale context and runtime setup

## File Structure

```
src/
├── components/           # React components with m["key"]() calls
├── messages/            # Translation JSON files
│   ├── en.json         # English translations
│   └── vi.json         # Vietnamese translations  
├── paraglide/          # Generated Paraglide files
│   ├── messages.js     # Import this for translations
│   └── runtime.js      # Locale management
└── data/               # Complex content (help center, etc.)
    ├── help-center-en.ts
    └── help-center-vi.ts
```

This flow ensures consistent, maintainable translations across the entire application while following React best practices and Paraglide JS conventions.
