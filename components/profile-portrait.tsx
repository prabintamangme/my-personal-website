import Image from "next/image";

type ProfilePortraitProps = {
  variant?: "hero" | "compact" | "about";
  priority?: boolean;
};

export function ProfilePortrait({ variant = "about", priority = false }: ProfilePortraitProps) {
  return <figure className={`profile-portrait profile-${variant}`}>
    <div className="profile-photo-frame">
      <Image
        className="profile-photo"
        src="/images/prabin-tamang.jpg"
        alt="Prabin Tamang"
        fill
        priority={priority}
        sizes={variant === "hero" ? "(max-width: 620px) 64vw, 320px" : variant === "compact" ? "160px" : "(max-width: 620px) 62vw, 280px"}
      />
    </div>
    <figcaption className="profile-caption">
      <strong>Prabin Tamang</strong>
      <span>Founder, LEARNINGEVERGROW</span>
    </figcaption>
  </figure>;
}
