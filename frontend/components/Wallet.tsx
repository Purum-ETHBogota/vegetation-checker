import React, { useState, useEffect, useRef } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import styled from 'styled-components';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';

const Wallet = (props: { handleWalletConnected: any, accountConnected: any }) => {
  const { handleWalletConnected, accountConnected } = props;
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        const firstAccount: string = accounts[0];
        setButtonText(`${firstAccount.slice(0, 5)}…${firstAccount.slice(-3)}`);
        setDisabled(true);
        handleWalletConnected()
        onboarding?.current?.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts: React.SetStateAction<never[]>) {
      setAccounts(newAccounts);
      accountConnected(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts: React.SetStateAction<never[]>) => setAccounts(newAccounts));
    } else {
      onboarding?.current?.startOnboarding();
    }
  };

  return (
    <StyledButton disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 210px;
  height: 50px;
  border-radius: 10px;
  background-color: #494949;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`;

export default Wallet;