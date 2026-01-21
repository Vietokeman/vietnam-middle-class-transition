/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { useGesture } from "@use-gesture/react";
import gsap from "gsap";

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULT_IMAGES: ImageItem[] = [
  {
    src: "https://nghiencuulichsu.com/wp-content/uploads/2015/11/nguyen-ai-quoc.jpg?w=640",
    alt: "Hình ảnh lưu niệm Nguyễn Ái Quốc và những người bạn Pháp tại Paris vào năm 1921",
  },
  {
    src: "https://hungyen.dcs.vn/ckfinder/userfiles/images/son-8571(1).jpg",
    alt: "Nguyễn Ái Quốc với nhân dân Moskva (Nga) trên đồi Chim Sẻ, trong thời gian tham dự Đại hội lần thứ V Quốc tế cộng sản (17-6/8-7-1924). Ảnh: Tư liệu/TTXVN",
  },
  {
    src: "https://tuongnangtien.wordpress.com/wp-content/uploads/2021/04/1-thauchin.png",
    alt: "Bác Hồ (Thầu Chín) và các đồng chí tại Thái Lan năm 1928. Thầu Chín là bí danh của lãnh tụ Nguyễn Ái Quốc hoạt động ở Xiêm, nay là Vương quốc Thái Lan, trong thời gian 1928-1929. Thầu là tiếng Thái-Lào, để gọi người nhiều tuổi và biểu thị sự tôn kính. Ảnh: Tư liệu/TTXVN ",
  },
  {
    src: "https://file.qdnd.vn/data/images/0/2021/05/29/phucthang/06-hcm01.jpg?dpi=150&quality=100&w=575",
    alt: "Hình ảnh trong chuyến hành trình tìm đường cứu nước của Bác từ ngày 25 đến 30-12-1920, chàng thanh niên yêu nước Nguyễn Ái Quốc (tên của Chủ tịch Hồ Chí Minh trong thời gian hoạt động cách mạng ở Pháp) tham dự Đại hội lần thứ 18 Đảng Xã hội Pháp ở thành phố Tours với tư cách đại biểu Đông Dương",
  },
  ///==============================================
  {
    src: "https://i.pinimg.com/1200x/c6/72/43/c67243a0af267b0ab918ba7834f28a53.jpg",
    alt: "Hình ảnh lưu niệm Nguyễn Ái Quốc và những người bạn Pháp tại Paris vào năm 1921",
  },
  {
    src: "https://i.pinimg.com/1200x/e6/7c/2d/e67c2d4aef707306d987d8920988b0a3.jpg",
    alt: "Nguyễn Ái Quốc với nhân dân Moskva (Nga) trên đồi Chim Sẻ, trong thời gian tham dự Đại hội lần thứ V Quốc tế cộng sản (17-6/8-7-1924). Ảnh: Tư liệu/TTXVN",
  }
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "" }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`
    );
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") {
      return { src: image, alt: "" };
    }
    return { src: image.src || "", alt: image.alt || "" };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length]
  );

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
  }));
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "400px",
  openedImageHeight = "400px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = true,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);

  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  // State cho custom card
  const [selectedCard, setSelectedCard] = useState<{ src: string; alt: string } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Animate modal opening
  useEffect(() => {
    if (selectedCard && modalRef.current && !isExpanded) {
      gsap.fromTo(modalRef.current,
        { scale: 0.3, opacity: 0, rotateY: -20 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.6, ease: 'back.out(1.4)' }
      );
    }
  }, [selectedCard, isExpanded]);

  // Hover effects on elements
  const addHoverEffect = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;

    ref.current.addEventListener('mouseenter', () => {
      gsap.to(ref.current, { boxShadow: '0 20px 80px rgba(139,26,26,0.6)', scale: 1.02, duration: 0.3 });
    });

    ref.current.addEventListener('mouseleave', () => {
      gsap.to(ref.current, { boxShadow: '0 20px 60px rgba(139,26,26,0.4)', scale: 1, duration: 0.3 });
    });
  };

  useEffect(() => {
    if (isExpanded) {
      addHoverEffect(imageBoxRef);
      addHoverEffect(textBoxRef);
    }
  }, [isExpanded]);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty(
        "--image-filter",
        grayscale ? "grayscale(1)" : "none"
      );
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector(
        ".enlarge"
      ) as HTMLElement;
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement("div");
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft =
            frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop =
            frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;

      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);

      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({
        event,
      }: {
        event: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent;
      }) => {
        if (focusedElRef.current) return;
        stopInertia();
        // Only handle PointerEvent and MouseEvent for drag start
        let clientX = 0,
          clientY = 0;
        if ("clientX" in event && "clientY" in event) {
          clientX = (event as MouseEvent | PointerEvent).clientX;
          clientY = (event as MouseEvent | PointerEvent).clientY;
        }
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: clientX, y: clientY };
      },
      onDrag: (state) => {
        const {
          event,
          last,
          velocity = [0, 0],
          direction = [0, 0],
          movement,
        } = state;

        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;

        // Support MouseEvent, TouchEvent, PointerEvent
        let clientX = 0,
          clientY = 0;
        if ("clientX" in event && "clientY" in event) {
          clientX = (event as MouseEvent | PointerEvent).clientX;
          clientY = (event as MouseEvent | PointerEvent).clientY;
        } else if ("touches" in event && event.touches.length > 0) {
          clientX = event.touches[0].clientX;
          clientY = event.touches[0].clientY;
        }

        const dxTotal = clientX - startPosRef.current.x;
        const dyTotal = clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(
          startRotRef.current.y + dxTotal / dragSensitivity
        );

        if (
          rotationRef.current.x !== nextX ||
          rotationRef.current.y !== nextY
        ) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;

          let [vMagX, vMagY] = velocity;
          const [dirX, dirY] = direction;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (
            Math.abs(vx) < 0.001 &&
            Math.abs(vy) < 0.001 &&
            Array.isArray(movement)
          ) {
            const [mx, my] = movement;
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
          }

          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {
            startInertia(vx, vy);
          }

          if (movedRef.current) lastDragEndAt.current = performance.now();

          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _openItemFromElement = (el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();

    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;
    el.setAttribute("data-focused", "true");

    const offsetX = getDataNumber(parent, "offsetX", 0);
    const offsetY = getDataNumber(parent, "offsetY", 0);
    const sizeX = getDataNumber(parent, "sizeX", 2);
    const sizeY = getDataNumber(parent, "sizeY", 2);

    const parentRot = computeItemBaseRotation(
      offsetX,
      offsetY,
      sizeX,
      sizeY,
      segments
    );
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;
    parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
    parent.style.setProperty("--rot-x-delta", `${rotX}deg`);

    const refDiv = document.createElement("div");
    refDiv.className = "item__image item__image--reference";
    refDiv.style.opacity = "0";
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);

    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current!.getBoundingClientRect();
    const frameR = frameRef.current!.getBoundingClientRect();
    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height,
    };

    el.style.visibility = "hidden";
    (el.style as any).zIndex = 0;

    const overlay = document.createElement("div");
    overlay.className = "enlarge";
    overlay.style.position = "absolute";
    overlay.style.left = frameR.left - mainR.left + "px";
    overlay.style.top = frameR.top - mainR.top + "px";
    overlay.style.width = frameR.width + "px";
    overlay.style.height = frameR.height + "px";
    overlay.style.opacity = "0";
    overlay.style.zIndex = "30";
    overlay.style.willChange = "transform, opacity";
    overlay.style.transformOrigin = "top left";
    overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;

    const rawSrc =
      parent.dataset.src ||
      (el.querySelector("img") as HTMLImageElement)?.src ||
      "";
    const img = document.createElement("img");
    img.src = rawSrc;
    overlay.appendChild(img);
    viewerRef.current!.appendChild(overlay);

    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;
    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`;
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
      rootRef.current?.setAttribute("data-enlarging", "true");
    });

    const wantsResize = openedImageWidth || openedImageHeight;
    if (wantsResize) {
      const onFirstEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return;
        overlay.removeEventListener("transitionend", onFirstEnd);
        const prevTransition = overlay.style.transition;
        overlay.style.transition = "none";
        const tempWidth = openedImageWidth || `${frameR.width}px`;
        const tempHeight = openedImageHeight || `${frameR.height}px`;
        overlay.style.width = tempWidth;
        overlay.style.height = tempHeight;
        const newRect = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + "px";
        overlay.style.height = frameR.height + "px";
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
        const centeredLeft =
          frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
        const centeredTop =
          frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
        requestAnimationFrame(() => {
          overlay.style.left = `${centeredLeft}px`;
          overlay.style.top = `${centeredTop}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
        });
        const cleanupSecond = () => {
          overlay.removeEventListener("transitionend", cleanupSecond);
          overlay.style.transition = prevTransition;
        };
        overlay.addEventListener("transitionend", cleanupSecond, {
          once: true,
        });
      };
      overlay.addEventListener("transitionend", onFirstEnd);
    }
  };

  const onTileClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingRef.current) return;
    if (performance.now() - lastDragEndAt.current < 80) return;
    if (openingRef.current) return;

    // Get image info from parent
    const parent = e.currentTarget.parentElement as HTMLElement;
    const rawSrc = parent?.dataset.src || "";
    const rawAlt = parent?.dataset.alt || "";

    // Open modal with image centered
    setSelectedCard({ src: rawSrc, alt: rawAlt });
    setIsExpanded(false);
    lockScroll();
  }, [lockScroll]);

  const onTilePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "touch") return;
      if (draggingRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;

      const parent = e.currentTarget.parentElement as HTMLElement;
      const rawSrc = parent?.dataset.src || "";
      const rawAlt = parent?.dataset.alt || "";

      setSelectedCard({ src: rawSrc, alt: rawAlt });
      setIsExpanded(false);
      lockScroll();
    },
    [lockScroll]
  );

  const onTileTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (draggingRef.current) return;
    if (performance.now() - lastDragEndAt.current < 80) return;
    if (openingRef.current) return;

    const parent = e.currentTarget.parentElement as HTMLElement;
    const rawSrc = parent?.dataset.src || "";
    const rawAlt = parent?.dataset.alt || "";

    setSelectedCard({ src: rawSrc, alt: rawAlt });
    setIsExpanded(false);
    lockScroll();
  }, [lockScroll]);

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;

      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement;
      const overlay = viewerRef.current?.querySelector(
        ".enlarge"
      ) as HTMLElement | null;
      if (!overlay) return;

      const refDiv = parent.querySelector(
        ".item__image--reference"
      ) as HTMLElement | null;

      const originalPos = originalTilePositionRef.current;
      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);
        el.style.visibility = "";
        (el.style as any).zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");
        openingRef.current = false;
        unlockScroll();
        return;
      }

      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current!.getBoundingClientRect();

      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      };

      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      };

      const animatingOverlay = document.createElement("div");
      animatingOverlay.className = "enlarge-closing";
      animatingOverlay.style.cssText = `
        position: absolute;
        left: ${overlayRelativeToRoot.left}px;
        top: ${overlayRelativeToRoot.top}px;
        width: ${overlayRelativeToRoot.width}px;
        height: ${overlayRelativeToRoot.height}px;
        z-index: 9999;
        border-radius: var(--enlarge-radius, 32px);
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${enlargeTransitionMs}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
      `;

      const originalImg = overlay.querySelector("img");
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement;
        img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
        animatingOverlay.appendChild(img);
      }

      overlay.remove();
      rootRef.current!.appendChild(animatingOverlay);

      void animatingOverlay.getBoundingClientRect();

      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
        animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
        animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
        animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
        animatingOverlay.style.opacity = "0";
      });

      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;

        if (refDiv) refDiv.remove();
        parent.style.transition = "none";
        el.style.transition = "none";

        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);

        requestAnimationFrame(() => {
          el.style.visibility = "";
          el.style.opacity = "0";
          (el.style as any).zIndex = 0;
          focusedElRef.current = null;
          rootRef.current?.removeAttribute("data-enlarging");

          requestAnimationFrame(() => {
            parent.style.transition = "";
            el.style.transition = "opacity 300ms ease-out";

            requestAnimationFrame(() => {
              el.style.opacity = "1";
              setTimeout(() => {
                el.style.transition = "";
                el.style.opacity = "";
                openingRef.current = false;
                if (
                  !draggingRef.current &&
                  rootRef.current?.getAttribute("data-enlarging") !== "true"
                ) {
                  document.body.classList.remove("dg-scroll-lock");
                }
              }, 300);
            });
          });
        });
      };

      animatingOverlay.addEventListener("transitionend", cleanup, {
        once: true,
      });
    };

    scrim.addEventListener("click", close);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      scrim.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [enlargeTransitionMs, unlockScroll]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("dg-scroll-lock");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="dome-gallery"
      style={
        {
          ["--segments-x" as any]: segments,
          ["--segments-y" as any]: segments,
          ["--overlay-blur-color" as any]: overlayBlurColor,
          ["--tile-radius" as any]: imageBorderRadius,
          ["--enlarge-radius" as any]: openedImageBorderRadius,
          ["--image-filter" as any]: grayscale ? "grayscale(1)" : "none",
        } as React.CSSProperties
      }
    >
      <main ref={mainRef} className="sphere-main">
        <div className="sparks">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="spark"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => {
              const tileId = `${it.x},${it.y},${i}`;

              return (
                <div
                  key={tileId}
                  className="item"
                  data-tile-id={tileId}
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      ["--offset-x" as any]: it.x,
                      ["--offset-y" as any]: it.y,
                      ["--item-size-x" as any]: it.sizeX,
                      ["--item-size-y" as any]: it.sizeY,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="item__image"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || "Open image"}
                    onClick={onTileClick}
                    onPointerUp={onTilePointerUp}
                    onTouchEnd={onTileTouchEnd}
                  >
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        if (!img.dataset.errorHandled) {
                          img.dataset.errorHandled = "true";
                          img.src = `https://picsum.photos/seed/${Math.random()}/800/600`;
                        }
                      }}
                    />
                  </div>
                </div>
              )
            }
            )}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>

      {/* Modal with Pop & Flip Animation */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          style={{ position: 'fixed', perspective: '2000px' }}
          onClick={() => {
            setSelectedCard(null);
            setIsExpanded(false);
            unlockScroll();
          }}
        >
          <div
            ref={modalRef}
            className="relative"
            style={{
              width: isExpanded ? '95vw' : '800px',
              maxWidth: isExpanded ? '1600px' : '90vw',
              height: '80vh',
              maxHeight: '900px',
              transformStyle: 'preserve-3d',
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                // Second click - Image rotates 360°, move to Grid 2, text appears on Grid 3
                setIsExpanded(true);

                const tl = gsap.timeline();

                // Image rotates 360° Y-axis while moving to Grid 2 position
                tl.to(imageBoxRef.current, {
                  rotateY: 360,
                  duration: 1.2,
                  ease: 'power2.inOut',
                  transformOrigin: 'center center'
                }, 0)

                  // Arrow appears & rotates during spin (lively effect)
                  .fromTo(arrowRef.current,
                    {
                      opacity: 0,
                      scale: 0.2,
                      rotateZ: -90,
                      rotateY: -180
                    },
                    {
                      opacity: 1,
                      scale: 1,
                      rotateZ: 0,
                      rotateY: 0,
                      duration: 0.7,
                      ease: 'back.out(2.2)'
                    },
                    '+=0.4'
                  )

                  // Text pops in after image rotation completes
                  .fromTo(textBoxRef.current,
                    {
                      opacity: 0,
                      scale: 0.4,
                      x: 60,
                      rotateY: 90
                    },
                    {
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      rotateY: 0,
                      duration: 0.7,
                      ease: 'back.out(1.6)'
                    },
                    '-=0.3'
                  );
              } else {
                // Toggle back - collapse the grid
                setIsExpanded(false);
              }
            }}
          >
            {!isExpanded ? (
              /* Centered Image View */
              <div className="w-full h-full bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-[0_25px_70px_rgba(139,26,26,0.5)] overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#8B1A1A] to-[#AC0705] px-8 py-6 border-b-4 border-[#FFD700]">
                  <h3 className="text-white font-bold text-3xl text-center tracking-wide">
                    LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM
                  </h3>
                </div>

                {/* Image Container */}
                <div className="p-10 flex items-center justify-center h-[calc(100%-100px)]">
                  <img
                    src={selectedCard.src}
                    alt={selectedCard.alt}
                    className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
                  />
                </div>

                {/* Click Hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1A1A] px-8 py-4 rounded-full text-base font-bold shadow-lg animate-pulse border-2 border-[#8B1A1A]">
                  👆 Click để xem mô tả chi tiết
                </div>
              </div>
            ) : (
              /* Grid Layout: Grid 2 (Image) | Arrow | Grid 3 (Text) */
              <div
                className="w-full h-full grid grid-cols-12 gap-6 p-6"
                style={{ perspective: '2000px' }}
              >
                {/* Grid 1: Empty space */}
                <div className="col-span-3"></div>

                {/* Grid 2: Image Box (after spin) */}
                <div
                  ref={imageBoxRef}
                  className="col-span-3 bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-[0_20px_60px_rgba(139,26,26,0.4)] overflow-hidden flex flex-col transition-all duration-300 hover:cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="bg-gradient-to-r from-[#8B1A1A] to-[#AC0705] px-4 py-3 border-b-4 border-[#FFD700]">
                    <h3 className="text-white font-bold text-lg text-center tracking-wide">
                      🖼️ HÌNH ẢNH
                    </h3>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center">
                    <img
                      src={selectedCard.src}
                      alt={selectedCard.alt}
                      className="max-w-full max-h-full rounded-xl shadow-xl object-contain"
                    />
                  </div>
                </div>

                {/* Arrow between Grid 2 and Grid 3 */}
                <div
                  ref={arrowRef}
                  className="col-span-1 flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1200px'
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      width: '90px',
                      height: '90px',
                      transformStyle: 'preserve-3d',
                      animation: 'float 4s ease-in-out infinite'
                    }}
                  >
                    {/* Arrow Shaft with gradient */}
                    <div
                      className="absolute top-1/2 left-0 bg-gradient-to-r from-[#8B1A1A] via-[#C71C1C] to-[#AC0705] rounded-l-lg shadow-lg"
                      style={{
                        width: '50px',
                        height: '12px',
                        transform: 'translateY(-50%) translateZ(12px)',
                        boxShadow: '0 8px 20px rgba(139, 26, 26, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                      }}
                    />

                    {/* Arrow Head - Triangle */}
                    <div
                      className="absolute top-1/2 right-0"
                      style={{
                        transform: 'translateY(-50%) translateZ(15px)',
                        width: 0,
                        height: 0,
                        borderTop: '22px solid transparent',
                        borderBottom: '22px solid transparent',
                        borderLeft: '35px solid #AC0705',
                        filter: 'drop-shadow(0 8px 16px rgba(139, 26, 26, 0.8))',
                      }}
                    />

                    {/* Depth shadow layers */}
                    <div
                      className="absolute top-1/2 left-0 bg-[#6B0F0F] rounded-l-lg"
                      style={{
                        width: '50px',
                        height: '12px',
                        transform: 'translateY(-50%) translateZ(6px)',
                        opacity: 0.8
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-0 bg-[#4B0909] rounded-l-lg"
                      style={{
                        width: '50px',
                        height: '12px',
                        transform: 'translateY(-50%) translateZ(0px)',
                        opacity: 0.6
                      }}
                    />

                    {/* Glow effect */}
                    <div
                      className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#FFD700] rounded-full blur-2xl opacity-40"
                      style={{
                        transform: 'translate(-50%, -50%) translateZ(-15px)',
                      }}
                    />

                    {/* Extra shine for depth */}
                    <div
                      className="absolute top-1/4 left-1/4 w-20 h-20 bg-white rounded-full blur-xl opacity-30"
                      style={{
                        transform: 'translateZ(20px)',
                      }}
                    />
                  </div>
                </div>

                {/* Grid 3: Text Box */}
                <div
                  ref={textBoxRef}
                  className="col-span-5 bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-50 rounded-3xl shadow-[0_20px_60px_rgba(180,100,0,0.3)] overflow-hidden flex flex-col transition-all duration-300 hover:cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="bg-gradient-to-r from-amber-900 to-amber-800 px-6 py-4 border-b-4 border-amber-600">
                    <h3 className="text-white font-bold text-xl text-center tracking-wide">
                      📜 MÔ TẢ CHI TIẾT
                    </h3>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-amber-50 border-4 border-amber-700 rounded-2xl p-6 h-full shadow-[inset_0_4px_12px_rgba(120,80,40,0.1)]">
                      <p className="text-amber-900 font-bold text-lg leading-relaxed">
                        {selectedCard.alt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCard(null);
                setIsExpanded(false);
                unlockScroll();
              }}
              className="absolute top-4 right-4 w-14 h-14 bg-[#FFD700] hover:bg-[#FFA500] text-[#8B1A1A] rounded-full flex items-center justify-center font-bold text-3xl shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-90 z-20"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
