function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-white text-5xl xs:text-6xl font-bold">{title}</h2>
      <div className="text-gray-400 leading-tight text-lg xs:text-xl max-w-2xl mx-auto">
        {description}
      </div>
    </>
  );
}

export default SectionTitle;
