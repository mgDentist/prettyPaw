import { gsap } from "gsap";

export const locationHover = () => {
    const locationList = document.querySelector('.location__list');
    const locationItems = document.querySelectorAll('.location__item');

    const mediaQueryXL = window.matchMedia('(min-width: 1280px)');
    const mediaQueryLG = window.matchMedia('(min-width: 1024px)');


    for (const item of locationItems) {
        const content = item.querySelector('.location__content');
        const title = item.querySelector('.location__title');
        const description = item.querySelector('.location__description');

        const tl = gsap.timeline({ paused: true });

        tl.to(content, { opacity: 0, duration: 0.5 })
            .to(content, {
                transform: 'none',
                left: 0,
                bottom: 0,
                top: 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                duration: 0,
            })
            .to(title, {
                whiteSpace: 'unset',
                hyphens: 'auto',
                color: '#ffaa05',
                marginBottom: mediaQueryXL.matches ? '40px' : '24px',
                duration: 0,
            })
            .to(description, { display: 'block', duration: 0 })
            .to(content, {
                opacity: 1,
                duration: 0.5,
            });

        item.addEventListener('mouseenter', () => {
            if (mediaQueryLG.matches) {
                tl.play();

                gsap.to(locationList, {
                    '--background-image': `url('${item.dataset.image}')`,
                    '--opacity': 1,
                    duration: 1,
                })
            }
        });

        item.addEventListener('mouseleave', () => {
            if (mediaQueryLG.matches) {
                tl.reverse();

                gsap.to(locationList, {
                    '--opacity': 1,
                    duration: 1,
                });
            }
        });

        const linkPreLoad = document.createElement('link');

        linkPreLoad.rel = 'preload';
        linkPreLoad.href = item.dataset.image;
        linkPreLoad.as = 'image';

        if (mediaQueryLG.matches) {
            document?.head.append(linkPreLoad);
        }

        mediaQueryLG.addEventListener('change', (e) => {
            if (!e.matches) {
                content.style = '';
                title.style = '';
                description.style = '';
            } else {
                document?.head.append(linkPreLoad);
            }
        });
    }
};