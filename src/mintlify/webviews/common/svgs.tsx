import React from 'react';

export const CodeSymbolIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
};

export const CodeFileIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
};

export const InfoCircleIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );
};

export const GoogleButton = ({ className }: { className: string }) => {
  return (
    <svg width="124" height="124" viewBox="0 0 124 124" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M122.683 63.3953C122.683 59.3137 122.321 55.4387 121.701 51.667H63.3175V74.9687H96.7458C95.2475 82.6153 90.8558 89.0737 84.3458 93.4653V108.965H104.289C115.966 98.167 122.683 82.2537 122.683 63.3953Z" />
      <path d="M63.3175 124C80.0575 124 94.0592 118.42 104.289 108.965L84.3458 93.4654C78.7658 97.1854 71.6875 99.4587 63.3175 99.4587C47.1458 99.4587 33.4542 88.557 28.5458 73.832H7.98248V89.797C18.1608 110.05 39.0858 124 63.3175 124Z" />
      <path d="M28.5458 73.8315C27.2542 70.1115 26.5825 66.1331 26.5825 61.9998C26.5825 57.8664 27.3058 53.8881 28.5458 50.1681V34.2031H7.9825C3.74583 42.5731 1.3175 51.9764 1.3175 61.9998C1.3175 72.0231 3.74583 81.4265 7.9825 89.7965L28.5458 73.8315Z" />
      <path d="M63.3175 24.5417C72.4625 24.5417 80.6258 27.6934 87.0842 33.8417L104.754 16.1717C94.0592 6.14834 80.0575 0 63.3175 0C39.0858 0 18.1608 13.95 7.98248 34.2033L28.5458 50.1684C33.4542 35.4434 47.1458 24.5417 63.3175 24.5417Z" />
    </svg>
  );
};

export const GitHubButton = ({ className }: { className: string }) => {
  return (
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" />
    </svg>
  );
};

export const MintlifyButton = ({ className }: { className: string }) => {
  return (
    <svg width="592" height="603" viewBox="0 0 592 603" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_380_65" fill="white">
      <path d="M218.256 66.5847C178.792 107.439 156.489 162.36 156.076 219.699C155.449 268.394 170.666 315.928 199.348 354.87L197.748 356.428L43.86 513.324C12.4785 470.58 -2.7309 417.732 1.02294 364.478C4.77678 311.224 27.2421 261.136 64.2959 223.407L65.8232 221.924L218.184 66.5847H218.256Z"/>
      <path d="M526.032 380.451C496.871 409.588 460.266 429.785 420.392 438.739C380.518 447.693 338.978 445.044 300.509 431.094C279.998 423.67 260.722 413.093 243.347 399.729L87.859 558.183C129.8 590.098 181.606 605.556 233.806 601.73C286.006 597.904 335.112 575.05 372.144 537.347L526.032 380.451Z"/>
      <path d="M591.339 221.924V0.000111048H373.671C345.084 -0.029089 316.773 5.7006 290.364 16.86C263.955 28.0195 239.969 44.3887 219.784 65.0275L218.256 66.5847C191.65 94.1238 172.613 128.312 163.057 165.72C180.356 161.153 198.134 158.738 216.002 158.528C263.765 157.954 310.374 173.491 348.581 202.72C382.918 228.828 408.907 264.715 423.27 305.859C437.909 347.911 439.834 393.475 428.797 436.655C465.495 426.929 499.031 407.518 526.032 380.377L527.559 378.894C547.811 358.305 563.871 333.838 574.817 306.9C585.763 279.961 591.378 251.082 591.339 221.924Z"/>
      </mask>
      <path d="M156.076 219.699L204.072 220.317L204.074 220.181L204.075 220.045L156.076 219.699ZM218.184 66.5847V18.5847H198.029L183.916 32.9737L218.184 66.5847ZM65.8232 221.924L99.2613 256.361L99.6813 255.953L100.091 255.535L65.8232 221.924ZM64.2959 223.407L30.8577 188.97L30.449 189.367L30.0498 189.773L64.2959 223.407ZM1.02294 364.478L48.9041 367.853L1.02294 364.478ZM43.86 513.324L5.16822 541.731L38.587 587.249L78.1281 546.935L43.86 513.324ZM197.748 356.428L164.27 322.029L163.87 322.418L163.48 322.817L197.748 356.428ZM199.348 354.87L232.825 389.269L262.807 360.09L237.996 326.405L199.348 354.87ZM526.032 380.451L560.3 414.062L492.105 346.496L526.032 380.451ZM300.509 431.094L316.873 385.969L316.859 385.964L316.845 385.959L300.509 431.094ZM243.347 399.729L272.611 361.682L238.886 335.742L209.086 366.11L243.347 399.729ZM87.859 558.183L53.5987 524.564L15.4726 563.417L58.7919 596.381L87.859 558.183ZM372.144 537.347L406.388 570.982L406.4 570.97L406.412 570.958L372.144 537.347ZM591.339 221.924H543.339V221.955L543.34 221.987L591.339 221.924ZM591.339 0.000111048H639.339V-47.9999H591.339V0.000111048ZM373.671 0.000111048L373.622 48.0001L373.647 48.0001H373.671V0.000111048ZM219.784 65.0275L254.052 98.6377L254.076 98.6137L254.1 98.5897L219.784 65.0275ZM163.057 165.72L116.551 153.84L96.3339 232.981L175.311 212.13L163.057 165.72ZM216.002 158.528L216.566 206.524L216.578 206.524L216.002 158.528ZM348.581 202.72L319.416 240.843L319.472 240.886L319.529 240.929L348.581 202.72ZM423.27 305.859L468.602 290.079L468.595 290.059L468.588 290.038L423.27 305.859ZM428.797 436.655L382.292 424.769L362.04 504.007L441.095 483.053L428.797 436.655ZM526.032 380.377L492.594 345.94L492.296 346.23L492.003 346.524L526.032 380.377ZM527.559 378.894L560.997 413.331L561.393 412.947L561.779 412.554L527.559 378.894ZM204.075 220.045C204.4 174.898 221.968 131.831 252.78 99.9333L183.733 33.2361C135.617 83.0473 108.578 149.822 108.077 219.354L204.075 220.045ZM218.256 18.5847H218.184V114.585H218.256V18.5847ZM183.916 32.9737L31.5551 188.313L100.091 255.535L252.452 100.196L183.916 32.9737ZM30.0498 189.773C-15.0858 235.731 -42.3102 296.581 -46.8583 361.103L48.9041 367.853C51.8638 325.866 69.5699 286.54 98.5421 257.04L30.0498 189.773ZM-46.8583 361.103C-51.4061 425.621 -32.9959 489.749 5.16822 541.731L82.5517 484.917C57.953 451.412 45.9443 409.844 48.9041 367.853L-46.8583 361.103ZM78.1281 546.935L232.016 390.039L163.48 322.817L9.59189 479.713L78.1281 546.935ZM231.225 390.826L232.825 389.269L165.87 320.472L164.27 322.029L231.225 390.826ZM237.996 326.405C215.561 295.943 203.579 258.637 204.072 220.317L108.08 219.082C107.319 278.152 125.771 335.913 160.699 383.336L237.996 326.405ZM97.7341 257.844L99.2613 256.361L32.385 187.487L30.8577 188.97L97.7341 257.844ZM492.105 346.496C469.311 369.27 440.803 384.96 409.875 391.905L430.909 485.573C479.73 474.61 524.43 449.906 559.959 414.406L492.105 346.496ZM409.875 391.905C378.953 398.849 346.74 396.8 316.873 385.969L284.145 476.218C331.216 493.288 382.083 496.537 430.909 485.573L409.875 391.905ZM316.845 385.959C301.006 380.227 286.087 372.047 272.611 361.682L214.082 437.777C235.357 454.14 258.991 467.114 284.173 476.229L316.845 385.959ZM58.7919 596.381C109.977 635.331 173.351 654.289 237.315 649.601L230.298 553.858C189.862 556.822 149.623 544.865 116.926 519.985L58.7919 596.381ZM237.315 649.601C301.274 644.914 361.269 616.919 406.388 570.982L337.9 503.712C308.955 533.181 270.739 550.894 230.298 553.858L237.315 649.601ZM639.339 221.924V0.000111048H543.339V221.924H639.339ZM591.339 -47.9999H373.671V48.0001H591.339V-47.9999ZM373.72 -47.9999C338.679 -48.0357 303.999 -41.0112 271.68 -27.3545L309.047 61.0746C329.547 52.4124 351.489 47.9775 373.622 48.0001L373.72 -47.9999ZM271.68 -27.3545C239.364 -13.6988 210.074 6.30649 185.468 31.4654L254.1 98.5897C269.864 82.471 288.546 69.7377 309.047 61.0746L271.68 -27.3545ZM185.515 31.4174L183.987 32.9745L252.525 100.195L254.052 98.6377L185.515 31.4174ZM183.736 33.233C151.287 66.8189 128.152 108.425 116.551 153.84L209.564 177.6C217.075 148.199 232.012 121.429 252.777 99.9364L183.736 33.233ZM175.311 212.13C188.798 208.569 202.65 206.688 216.566 206.524L215.438 110.531C193.618 110.787 171.915 113.737 150.804 119.31L175.311 212.13ZM216.578 206.524C253.519 206.081 289.674 218.089 319.416 240.843L377.746 164.596C331.075 128.892 274.01 109.828 215.426 110.531L216.578 206.524ZM319.529 240.929C346.282 261.271 366.661 289.337 377.952 321.679L468.588 290.038C451.152 240.094 419.555 196.384 377.633 164.51L319.529 240.929ZM377.938 321.639C389.473 354.776 390.996 390.717 382.292 424.769L475.302 448.542C488.672 396.233 486.344 341.047 468.602 290.079L377.938 321.639ZM441.095 483.053C486.093 471.126 527.11 447.352 560.061 414.23L492.003 346.524C470.952 367.684 444.896 382.731 416.5 390.257L441.095 483.053ZM559.47 414.814L560.997 413.331L494.121 344.457L492.594 345.94L559.47 414.814ZM561.779 412.554C586.465 387.457 605.993 357.684 619.286 324.969L530.348 288.831C521.749 309.993 509.156 329.154 493.339 345.234L561.779 412.554ZM619.286 324.969C632.578 292.255 639.386 257.217 639.339 221.861L543.34 221.987C543.37 244.948 538.947 267.667 530.348 288.831L619.286 324.969ZM209.086 366.11L53.5987 524.564L122.119 591.802L277.607 433.348L209.086 366.11ZM406.412 570.958L560.3 414.062L491.764 346.84L337.876 503.736L406.412 570.958Z" fill="white" mask="url(#path-1-inside-1_380_65)"/>
    </svg>
  );
};
