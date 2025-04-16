import Image from 'next/image';

interface WorkItemProps {
  imageUrl: string;
  alt: string;
}

const WorkItem: React.FC<WorkItemProps> = ({ imageUrl, alt }) => {
  return (
    <div className=" overflow-hidden cursor-pointer">
      <Image 
        src={imageUrl} 
        alt={alt} 
        width={400} 
        height={300} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default WorkItem;