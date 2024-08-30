# Application README

## Overview

This project involves a micro-frontend architecture with a focus on dynamic loading and Anti-Corruption Layer (ACL) design patterns.

### Remote Modules

The `remotes` object is where we define remote modules that our application depends on. For example, if our application needs to load components or utilities from another federated module, we specify those dependencies here.

### Exposed Modules

The `exposes` object defines the parts of our application that we want to make available to other federated modules.

### Anti-Corruption Layer (ACL)

The Anti-Corruption Layer (ACL) is implemented to handle interactions between different parts of our system. It consists of three main components:

1. **API**: This is the service or domain-specific language used by other micro-frontends or services.
2. **Adapter**: This component receives external data and transforms it into a format compatible with the micro-frontend where it will be used.
3. **Facade Interface**: This uses the adapter to integrate the transformed data into the micro-frontend application, providing a seamless way to handle external interactions.

#### Example Usage in the Cart Module

In the cart module, we used the `ProductService` as an Anti-Corruption Layer to convert incoming dollar prices to INR.

#### Example Routing in the Container Module

In `MainLayout.jsx` of the container module, we implemented routing to different micro-frontends. For example, routing is done to `ProductContent` and `PDPContent`.

### Dynamic Component Loading

We can dynamically load components from remotely deployed URLs. Here is an example of how to load the `Header` component dynamically:

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
