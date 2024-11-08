export default function Section({ title, children }) {
  return (
    <div className="my-8">
      <h1 className="text-xl font-bold mb-4 text-center lg:text-left">
        {title}
      </h1>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
}
