<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://alephzero.org/">
    <img src="src/assets/darkLogo.png" alt="Logo" width="90" height="80">
  </a>

  <h3 align="center">Aleph-foresight-frontend</h3>

  <p align="center">
     Aleph Foresight is a decentralized prediction market platform built on AlephZero blockchain. The frontend is designed to manage the platform's core functionalities, enabling users to create and participate in betting events securely and transparently.
    <br />
    <a href="https://alephzero.org/"><strong>Aleph Foresight »</strong></a>
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Aleph Foresight is a decentralized betting and event management platform built on blockchain. It allows users to create events, place bets, and manage various aspects of the betting process. Here are some key features and functionalities:

1. **Event Creation:** Users or admins can create events, specifying details like expiration time and betting closure time. The platform supports fee structures for both event creation and platform usage.

2. **Betting:** Users can place bets on events with options such as "Yes" or "No". The platform tracks betting pools and individual user bets securely.

3. **Event Management:** Admins can set or update event results, adjust platform fees, and manage event expiration and bet closure times.

4. **Payouts and Claims:** After an event concludes, users can claim rewards based on their bets and the event result. The platform handles payouts to users, admin rewards, and event creation fees.

5. **Dispute Resolution:** Users can raise disputes if they believe there’s an issue with an event's outcome, within a specific time frame.

6. **Administration and Upgrades:** The platform includes administrative controls for setting fees and upgrading the smart contract for easy navigation and exploration.

### Built With

- [![ReactJS][ReactJS]]

<!-- GETTING STARTED -->

## Getting Started

To set up the project follow the instructions:

### Installation

1. Create the env in root folder `.env`

   ```sh
   REACT_APP_ADMIN_PANEL_API_URL=XXXXXXXXXX
   REACT_APP_CONTRACT_ADDRESS=XXXXXXXXXX
   REACT_APP_WALLET_EVENT_SOCKET_URL=XXXXXXXXXX
   REACT_APP_IPFS_BACKEND=XXXXXXXXXX
   REACT_APP_ADMIN_CURRENCY_NAME=XXXXXXXXXX
   REACT_APP_USER_PANEl=XXXXXXXXXX
   REACT_APP_METAMASK_EXPLORER_NAVIGATE=XXXXXXXXXX
   REACT_APP_METAMASK_NETWROK_RPC_URL=XXXXXXXXXX
   REACT_APP_CHAINID= XXXXXXXXXX
   REACT_APP_CURRENCY_NAME=XXXXXXXXXX
   REACT_APP_CHAIN_NAME=XXXXXXXXXX
   REACT_APP_NETWORK_NAME=XXXXXXXXXX
   ```

2. Install dependencies
   ```sh
   node version - 18.19.0
   npm install
   ```
3. Run the app in development mode
   ```sh
   npm start
   ```

<!-- LICENSE -->

## License

Distributed under the Apache License. See `LICENSE.txt` for more information.
