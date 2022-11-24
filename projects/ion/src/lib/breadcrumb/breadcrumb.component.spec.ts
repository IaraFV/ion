import { render, screen } from '@testing-library/angular';
import { BreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';

const options = [
  {
    label: 'Inicio',
    link: '/home',
  },
  {
    label: 'Recursos',
    link: '/recursos',
  },
];

const sut = async (): Promise<void> => {
  await render(BreadcrumbComponent, {
    componentProperties: {
      breadcrumbs: options,
    },
  });
};

describe('Breadcrumb', () => {
  beforeEach(async () => {
    await sut();
  });

  it.each(options)(
    'should render %s in breadcrumb',
    async (link: BreadcrumbItem) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  );

  it('should render recursos in breadcrumb', async () => {
    expect(screen.getByText('Recursos')).toHaveClass('breacrumbs-link');
  });

  it.each(options)('should have correct link', async (link: BreadcrumbItem) => {
    expect(screen.getByText(link.label)).toHaveAttribute('href', link.link);
  });
});