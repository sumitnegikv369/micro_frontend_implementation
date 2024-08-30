# Micro FrontEnd 🚀

## Overview

This project involves a micro-frontend architecture with a focus on dynamic loading and Anti-Corruption Layer (ACL) design patterns.

### Remote Modules

The `remotes` object is where we define remote modules that our application depends on. For example, if our application needs to load components or utilities from another federated module, we specify those dependencies here.

### Exposed Modules

The `exposes` object defines the parts of our application that we want to make available to other federated modules.

### I heard an analogy that you should think of your universal remote control that you've set up to work with all your different stereo systems - you press "on" and it turns on your cable box, your receiver, and your TV. Maybe it's a really fancy home theater and it dims the lights and draws the shades too. That's a Facade - one button/function that takes care of a more complicated set of steps.

### A quick analogy for the Adapter pattern (based on the comments) might be something like a DVI-to-VGA adapter. Modern video cards are often DVI, but you've got an old VGA monitor. With an adapter that plugs into your video card's expected DVI input, and has its own VGA input, you'll be able to get your old monitor working with your new video card.

### Anti-Corruption Layer (ACL)

The Anti-Corruption Layer (ACL) is implemented to handle interactions between different parts of our system. It consists of three main components:

1. **API**: This is the service or domain-specific language used by other micro-frontends or services.
2. **Adapter**: This component receives external data and transforms it into a format compatible with the micro-frontend where it will be used.
3. **Facade Interface**: This uses the adapter to integrate the transformed data into the micro-frontend application, providing a seamless way to handle external interactions.

#### Example Usage in the Cart Module

In the cart module, we used the `ProductService` as an Anti-Corruption Layer to convert incoming dollar prices to INR.

#### Example Routing in the Container Module

In `MainLayout.jsx` of the container module, we implemented routing to different micro-frontends. For example, routing is done to `ProductList` and `PDPContent`.

### Dynamic Component Loading

And also we can dynamically load components from remotely deployed URLs. Here is an example of how to load the `Header` component dynamically:

```javascript
import React, { useState, useEffect } from 'react';

const App = () => {
  const [Header, setHeader] = useState(null);

  useEffect(() => {
    import('headerApp/Header')
      .then((module) => {
        setHeader(() => module.default);
      })
      .catch((error) => console.error('Error loading Header:', error));
  }, []);

  return (
    <div>
      <h2>Main Shell Application</h2>
      {Header ? <Header /> : <p>Loading Header...</p>}
    </div>
  );
};

export default App;
```

In the context of an Anti-Corruption Layer (ACL), the role of the ACL is to serve as a boundary that protects each application or micro-frontend from unwanted dependencies and changes in other systems. Here's how the ACL helps in managing API changes between Application A and Application B:

### Role of ACL

1. **Isolation of Changes**: ACL isolates Application B from changes in Application A's API by providing a stable and consistent interface. If Application A changes its API, Application B interacts with Application A through the ACL, so it only needs to adapt to changes in the ACL interface, not directly to Application A’s changes.

2. **Translation and Transformation**: The ACL translates and transforms data between Application A and Application B. This means that Application B's code only needs to deal with the interface provided by the ACL, which remains consistent even if Application A's internal data structures or API change.

3. **Version Management**: The ACL can handle version management of APIs. If Application A introduces a new version, the ACL can adapt to handle both the old and new versions, ensuring Application B remains functional while it transitions to the new API version.

### Working with ACL

#### Scenario: Application B Depends on Application A’s API

- **Application A**: Provides the API and may change its data formats or API structure.
- **Application B**: Consumes the API provided by Application A through the ACL.

### Example Workflow with ACL

1. **Defining ACL Interfaces**:
   - **Application A** provides data through its API.
   - **ACL** defines a consistent interface that Application B will interact with.

2. **Implementing the Adapter**:
   - **Adapter** in the ACL translates data from Application A's API format to the format expected by Application B.
   - When Application A changes its API, the Adapter in the ACL is updated to handle the new format.

3. **Maintaining Compatibility**:
   - **Application B** interacts with the ACL rather than directly with Application A.
   - When Application A's API changes, Application B only needs to interact with the updated ACL, not directly with Application A.

### Example Code

**1. Define the API (Application A)**:

**externalApi.js**:
```jsx
const externalApi = {
  fetchUserData: () => {
    // API response that might change
    return {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com'
    };
  }
};

export default externalApi;
```

**2. Create the ACL Adapter**:

**UserAdapter.js**:
```jsx
import externalApi from './externalApi';

class UserAdapter {
  static fetchUserData() {
    const externalData = externalApi.fetchUserData();
    
    // Transform external data format to internal format
    return {
      id: externalData.userId,
      name: `${externalData.firstName} ${externalData.lastName}`,
      email: externalData.emailAddress
    };
  }
}

export default UserAdapter;
```

**3. Use the ACL in Application B**:

**UserProfile.js**:
```jsx
import React, { useEffect, useState } from 'react';
import UserAdapter from './UserAdapter';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = UserAdapter.fetchUserData();
    setUser(userData);
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
```

### Summary

- **Isolation**: ACL isolates Application B from direct changes in Application A’s API.
- **Translation**: ACL handles data translation between different formats.
- **Consistency**: The interface provided by the ACL remains stable, even if the underlying API changes.

This approach ensures that changes in Application A’s API are handled within the ACL, minimizing the impact on Application B and allowing both teams to work more independently.


To manage changes in an external API when using an Adapter and ACL (Anti-Corruption Layer), you’ll need to follow a systematic approach. Here’s a detailed guide on how to handle this scenario effectively:

1. Understanding the Basics
Application A: Provides the API with a format that may change.
Application B: Consumes Application A’s API via the ACL, which provides a consistent interface.
2. Define the ACL Interface
Purpose: The ACL acts as an intermediary that shields Application B from changes in Application A’s API. The ACL defines a stable, consistent interface that Application B interacts with.

3. Implement the Adapter
Purpose: The Adapter translates data between Application A’s API and the format expected by Application B.

4. Maintain Compatibility
When Application A changes its API:

Update the Adapter: Modify the Adapter in the ACL to handle the new format from Application A.
Test: Ensure that the changes in the Adapter do not introduce issues in Application B.
Communicate Changes: Notify the development team of Application B about the changes, especially if there are any new features or deprecations.
Example Workflow
Here’s a detailed implementation and handling strategy with code examples:

1. Define the API (Application A)
The API of Application A may change over time. You need to keep track of the format and structure it provides.

javascript
Copy code
// externalApi.js
const externalApi = {
  fetchUserData: () => {
    // Example API response
    return {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com'
    };
  }
};

export default externalApi;
2. Create the ACL Adapter
The Adapter translates the API format of Application A to the format expected by Application B.

javascript
Copy code
// UserAdapter.js
import externalApi from './externalApi';

class UserAdapter {
  static fetchUserData() {
    const externalData = externalApi.fetchUserData();

    // Transform external data format to internal format
    return {
      id: externalData.userId,
      name: `${externalData.firstName} ${externalData.lastName}`,
      email: externalData.emailAddress
    };
  }
}

export default UserAdapter;
3. Use the ACL in Application B
Application B interacts with the ACL rather than directly with Application A’s API. This ensures minimal impact from API changes.

javascript
Copy code
// UserProfile.js
import React, { useEffect, useState } from 'react';
import UserAdapter from './UserAdapter';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = UserAdapter.fetchUserData();
      setUser(userData);
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
Handling API Changes
When Application A updates its API:

Update the Adapter: Modify the UserAdapter to handle the new API format. Ensure that the transformations match the new data structure.

javascript
Copy code
// Updated UserAdapter.js for new API format
import externalApi from './externalApi';

class UserAdapter {
  static fetchUserData() {
    const externalData = externalApi.fetchUserData();

    // Handle new API format
    return {
      id: externalData.newUserId, // Updated field name
      name: `${externalData.newFirstName} ${externalData.newLastName}`, // Updated field names
      email: externalData.newEmailAddress // Updated field name
    };
  }
}

export default UserAdapter;
Test Thoroughly: Ensure that the Adapter works correctly with the new API format. Validate that Application B continues to function as expected.

Communicate Changes: If the changes in the Adapter affect how Application B should work, provide documentation or updates to the team responsible for Application B.

it is indeed the responsibility of Team A to communicate changes in the API to Team B. Here’s a breakdown of how this process typically works:

# Handling API Changes Between Teams

## Overview

When Application A updates its API, it's crucial to manage the changes effectively to ensure Application B continues to function as expected. This document outlines the responsibilities of both Team A (API Provider) and Team B (API Consumer) in handling API changes and provides a step-by-step workflow for managing these updates.

## Responsibilities

### Team A (API Provider)

1. **Notify Team B of Changes**
   - Inform Team B whenever there are changes to the API, including updates to data formats, endpoints, or structural modifications.

2. **Provide Documentation**
   - Provide updated documentation that includes:
     - New API endpoints or changes to existing ones.
     - Modifications in data formats or structures.
     - Deprecations of old features or endpoints.
     - Any new features or enhancements.
   - This documentation helps Team B understand how to update their Adapter or integration layer.

3. **Offer Support**
   - Be available to answer any questions or provide clarifications needed by Team B during the transition period.

### Team B (API Consumer)

1. **Update the ACL Adapter**
   - Upon receiving notification and documentation from Team A, update the Adapter to handle the new API format or structure.

2. **Testing**
   - Thoroughly test the changes to ensure that the updated Adapter works with the new API and that Application B continues to function correctly.

3. **Integration and Deployment**
   - Integrate the updated Adapter into the application and deploy it. Ensure that the application’s interaction with the ACL remains smooth.

4. **Communicate Back**
   - If there are any issues or further clarifications needed, communicate these back to Team A.

## Example Workflow for API Changes

### Team A’s Role

1. **Announce Change**
   - Example: “We are updating the `fetchUserData` API. Here are the new fields and their formats.”

2. **Provide Documentation**
   - Detailed documentation on the new API structure.

3. **Support**
   - Example: “Feel free to reach out if you need help with the new API.”

### Team B’s Role

1. **Update Adapter**
   - Modify the `UserAdapter` to align with the new API format.

2. **Test Changes**
   - Ensure that the changes work as expected with the new API.

3. **Deploy Update**
   - Roll out the updated Adapter and monitor for any issues.

4. **Feedback**
   - Inform Team A if there are any issues or further clarifications needed.

## Testing Thoroughly

Ensure that the Adapter works correctly with the new API format and validate that Application B continues to function as expected.

## Another way is to check the version of a federated module and then deciding which adapter to use is a practical approach, especially in environments where multiple versions of an API or module might be in use. This approach helps manage compatibility between different versions of the federated module and the application’s adapter.

Here's how you can implement this strategy:

### Steps to Check Version and Select Adapter

1. **Version Management in Federated Module**

   Ensure that the federated module (or API) exposes its version. This might be through a dedicated endpoint, a version field in the module’s metadata, or any other method provided by the module.

   For example, you might have an endpoint like `/api/version` that returns the version of the API:

   ```json
   {
     "version": "1.2.0"
   }
   ```

2. **Fetch Version Information**

   In your application, fetch the version information from the federated module.

   ```javascript
   async function getModuleVersion() {
     const response = await fetch('https://api.example.com/version');
     const data = await response.json();
     return data.version;
   }
   ```

3. **Select the Appropriate Adapter**

   Based on the version retrieved, choose the appropriate adapter to handle the data.

   ```javascript
   import AdapterV1 from './AdapterV1';
   import AdapterV2 from './AdapterV2';

   async function getAdapterForVersion() {
     const version = await getModuleVersion();

     switch (version) {
       case '1.0.0':
       case '1.1.0':
         return AdapterV1;
       case '1.2.0':
       case '1.3.0':
         return AdapterV2;
       default:
         throw new Error('Unsupported version');
     }
   }
   ```

4. **Use the Selected Adapter**

   Once the appropriate adapter is selected, use it to handle the API interactions.

   ```javascript
   async function fetchUserData() {
     const Adapter = await getAdapterForVersion();
     const data = await Adapter.fetchUserData();
     return data;
   }
   ```

### Example Implementation

Here’s a complete example integrating these steps:

```javascript
// versionFetcher.js
export async function getModuleVersion() {
  const response = await fetch('https://api.example.com/version');
  const data = await response.json();
  return data.version;
}

// adapterSelector.js
import AdapterV1 from './AdapterV1';
import AdapterV2 from './AdapterV2';

export async function getAdapterForVersion() {
  const version = await getModuleVersion();

  switch (version) {
    case '1.0.0':
    case '1.1.0':
      return AdapterV1;
    case '1.2.0':
    case '1.3.0':
      return AdapterV2;
    default:
      throw new Error('Unsupported version');
  }
}

// main.js
import { getAdapterForVersion } from './adapterSelector';

async function fetchUserData() {
  const Adapter = await getAdapterForVersion();
  const data = await Adapter.fetchUserData();
  return data;
}

// Usage example
fetchUserData().then(userData => {
  console.log(userData);
}).catch(error => {
  console.error(error);
});
```

### Benefits of This Approach

1. **Flexibility**: Allows handling different versions of the federated module without changing the core application logic.
2. **Backward Compatibility**: Supports multiple versions, which is useful if different clients or modules are using different versions.
3. **Centralized Version Management**: Version-specific logic is centralized in the adapter, making it easier to manage and update.

### Considerations

- **Performance**: Fetching the version might introduce a delay, so consider caching the version if it doesn’t change frequently.
- **Error Handling**: Ensure robust error handling for unsupported versions and network issues.
- **Testing**: Test thoroughly to ensure that the correct adapter is used and that data is handled appropriately for each version.

By following these steps, you can manage compatibility and versioning effectively in a federated module system.

## Communicate Changes

If the changes in the Adapter affect how Application B should work, provide documentation or updates to the team responsible for Application B.


