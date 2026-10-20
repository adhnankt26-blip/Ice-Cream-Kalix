# Shared product reviews setup

The review interface is ready in the storefront. Complete these steps once to make reviews live on every device.

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/), then add a **Web app**.
2. In **Authentication → Sign-in method**, enable **Anonymous**. This creates a silent session in the browser, so shoppers never need to sign in.
3. In **Firestore Database**, create a database in production mode.
4. Copy the Web app configuration into `firebase-config.js`.
5. In **Firestore Database → Rules**, publish the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId}/reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.rating is int
        && request.resource.data.rating >= 1
        && request.resource.data.rating <= 5
        && request.resource.data.comment is string
        && request.resource.data.comment.size() > 0
        && request.resource.data.comment.size() <= 800;
      allow update: if request.auth != null
        && resource.data.uid == request.auth.uid
        && request.resource.data.uid == request.auth.uid;
      allow delete: if request.auth != null
        && resource.data.uid == request.auth.uid;
    }
  }
}
```

6. Add the deployed site domain under **Authentication → Settings → Authorized domains**. `localhost` is enabled by default for local development.

Reviews are stored per product at `products/{productId}/reviews`. Shoppers can edit or delete reviews written from the same browser/device; everyone can see the live review feed.
