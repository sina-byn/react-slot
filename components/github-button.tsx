'use client';

import ReactGithubButton from 'react-github-btn';

export function GithubButton() {
  return (
    <ReactGithubButton
      data-size='large'
      data-show-count={false}
      data-icon='octicon-star'
      href='https://github.com/sina-byn/react-slot'
      aria-label='Star sina-byn/react-slot on GitHub'
      data-color-scheme='no-preference: dark; light: dark; dark: dark;'
    >
      Star
    </ReactGithubButton>
  );
}
