# 📈 Nasdaq Browser – Real-Time Stock List App

A performant React Native application that displays a large list of stock tickers with real-time price updates using a virtualized list and mock WebSocket.

---

## 🚀 Features

- 🔍 Search and filter NASDAQ tickers
- 📊 Real-time price updates with mock WebSocket (simulating Polygon.io)
- ⚡ High-performance list rendering with `@shopify/flash-list`
- 🧠 State management with `zustand`
- 🎨 Custom theming & styles with hooks
- 📱 Optimized for large datasets with visible-only subscription logic

---

## 📁 Project Structure
```
├── assets/ # Fonts, images, and static files
├── components/ # Shared UI components (Text, Input, View, etc.)
├── constants/ # App-wide constants (e.g., API URLs)
├── hooks/ # Custom React hooks (e.g., useMockWs, useNasdaqTickers)
├── localization/ # i18n translations and setup (AR/EN)
├── navigation/ # App navigation (React Navigation stack)
├── screens/
│ ├── Splash/ # App splash screen
│ └── NasdaqBrowser/ # Main screen with list + WebSocket subscription
├── services/ # External API services (e.g., Polygon API integration)
├── store/ # Zustand store (centralized stock state)
├── themes/ # Light/dark theme definitions
├── types/ # TypeScript types (StockItem, StyleFnParams, etc.)
├── utils/ # Utility functions (e.g., px for layout, debounce)
├── App.tsx # App entry point
└── README.md # This file
```
---

## 🧰 Key Packages

| Package                                         | Version      | Purpose / Usage                                                            |
| ----------------------------------------------- | ------------ | -------------------------------------------------------------------------- |
| **`react-native`**                              | 0.81.0       | Core framework for building native apps using React                        |
| **`react`**                                     | 19.1.0       | React library core                                                         |
| **`@react-navigation/native`**                  | ^7.1.17      | Navigation container for handling navigation state                         |
| **`@react-navigation/native-stack`**            | ^7.3.25      | Native stack navigator for screen transitions                              |
| **`@shopify/flash-list`**                       | ^2.0.3       | High-performance virtualized list optimized for large datasets             |
| **`@tanstack/react-query`**                     | ^5.85.5      | Server state management, caching, background sync (used for data fetching) |
| **`zustand`**                                   | ^5.0.8       | Lightweight, scalable state management (used for stock data store)         |
| **`axios`**                                     | ^1.11.0      | Promise-based HTTP client used for REST API requests                       |
| **`i18next` & `react-i18next`**                 | ^25.4.2 / ^15.7.2 | Internationalization (i18n) support and translation hooks/components |
| **`lodash`**                                    | ^4.17.21     | Utility library for object/array manipulation, throttling, debounce, etc.  |
| **`@react-native-async-storage/async-storage`** | ^2.2.0       | Persistent storage solution for key-value data                             |
| **`react-native-fast-image`**                   | ^8.6.3       | Efficient image rendering with caching and performance optimizations       |
| **`react-native-skeleton-placeholder`**         | ^5.2.4       | Skeleton loading UI placeholder while data is loading                      |
| **`react-native-linear-gradient`**              | ^2.8.3       | Create linear gradients for styled backgrounds or UI effects               |
| **`react-native-vector-icons`**                 | ^10.3.0      | Custom font icon support                                                   |
| **`react-native-gesture-handler`**              | ^2.28.0      | Required for gesture-based navigation (used by `react-navigation`)         |
| **`react-native-screens`**                      | ^4.15.2      | Optimizes memory usage and performance during navigation                   |
| **`react-native-safe-area-context`**            | ^5.6.1       | Ensures UI respects device notches/safe areas                              |
| **`@react-native-masked-view/masked-view`**     | ^0.3.2       | Required for some navigation transitions and masks                         |
| **`@react-native/new-app-screen`**              | 0.81.0       | Default UI helpers provided by React Native CLI apps                       |

---

## 🧪 WebSocket Simulation

To avoid Polygon.io subscription requirements, `useMockWs` simulates price updates every second using:

- `setInterval`
- Random price/volume generation
- Updates the `zustand` store

---

## 🧪 TODO 

| Task Description                                                          | ✅ Status  |
| ------------------------------------------------------------------------- | ---------  |
| State management setup with `zustand`                                     | ✅ Done    |
| WebSocket simulation via `useMockWs`                                      | ✅ Done    |
| Data fetching via `react-query` with caching                              | ✅ Done    |
| Optimized ticker subscriptions using `FlashList` viewability              | ✅ Done    |
| Real WebSocket integration (e.g., Polygon.io) - Need subscription plan    | ✅ Done    |
| Dark/Light mode support                                                   | ✅ Done    |
| localization (ar/en) without restart                                      | ✅ Done    |
| Visual animation for price change (e.g., flash green/red)                 | ✅ Done    |
| Unit tests                                                                | ✅ Done |
| Sorting feature (price, name, etc.)                                       | 🕐 Planned |

---

## 🧪 Author 

Name     : Mohamed Saad
Email    : ms.rndeveloper@email.com

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run on iOS / Android
npx react-native run-ios
npx react-native run-android
