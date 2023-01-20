import { GetStaticPaths, GetStaticProps } from "next";
import { Text } from "../../DesignSystem/Text";
import { prisma } from "../../lib/prisma";
import { ScheduleForm } from "./ScheduleForm";

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
  };
}

export default function Schedule({
  user: { name, avatarUrl, bio },
}: ScheduleProps) {
  return (
    <div className="max-w-[852px] px-4 my-20 mb-4 mx-auto">
      <div className="flex flex-col items-center mb-6">
        <img src={avatarUrl} alt="Perfil" />
        <span className="text-white text-2xl">{name}</span>
        <Text>{bio}</Text>
      </div>

      <ScheduleForm />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
