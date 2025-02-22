import Image from 'next/image'

const avatars = [
  '/Avatar4.png',
  '/Avatar2.png',
  '/Avatar1.png',
  '/Avatar6.png',
  '/Avatar3.png',
  '/Avatar5.png',
]

interface AvatarProps {
  selected: string
  onSelect: (avatar: string) => void
}

export default function Avatar({ selected, onSelect }: AvatarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-full p-1 ${
            selected === avatar ? 'bg-purple-500' : 'bg-gray-200'
          }`}
          onClick={() => onSelect(avatar)}
        >
          <Image
            src={avatar}
            alt={`Avatar ${index + 1}`}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      ))}
    </div>
  )
}

