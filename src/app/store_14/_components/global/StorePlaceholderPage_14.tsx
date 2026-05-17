import SectionTitle from './SectionTitle';

function StorePlaceholderPage_14({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className='space-y-6'>
      <SectionTitle text={title} />
      <p className='max-w-2xl text-muted-foreground'>{description}</p>
    </section>
  );
}

export default StorePlaceholderPage_14;
