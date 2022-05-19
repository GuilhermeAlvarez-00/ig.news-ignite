import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe('Header component', () => {
  it('should render correctly', () => {
    render(<Header />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
