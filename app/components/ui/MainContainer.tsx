

import type { ReactNode } from 'react';

type MainContainerProps = {
    children: ReactNode;
    className?: string;
};

function MainContainer({ children, className = "" }: MainContainerProps) {
    return (
        <div className={`${className} mx-auto w-full max-w-[1366px]`}>
            {children}
        </div>
    );
}

export default MainContainer;
