import React, { useState, useCallback } from 'react';

interface TabProps {
  children: React.ReactNode;
  disabled?: boolean;
  label: string;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  defaultActiveTab?: string;
  onChangeTab: (tabLabel: string) => void | undefined;
}

interface ButtonProps {
    label: string,
    disabled: boolean
}

interface TabButtonsProps {
  buttons: ButtonProps[];
  changeTab: (tabLabel: string) => void;
  activeTab: string;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

const TabButtons: React.FC<TabButtonsProps> = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="flex flex-wrap gap-2 border-b-1 border-(--muted) w-[90%]">
      {buttons.map((button) => (
        <button
          key={button.label}
          disabled={button.disabled}
          className={`
            py-3 me-5 text-left font-normal text-sm leading-5 tracking-[0.16px] cursor-pointer
            ${button.label === activeTab ? 'text-secondary border-b-2 border-secondary' : "text-(--color-grey-2)"}
            ${button.disabled ? "opacity-40" : ""}
          `}
          onClick={() => changeTab(button.label)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};


export const Tabs: React.FC<TabsProps> = ({ children, defaultActiveTab, onChangeTab }) => {
  const initialTabLabel = defaultActiveTab || children[0]?.props.label || '';

  const [activeTab, setActiveTab] = useState<string>(initialTabLabel);

  const changeTab = useCallback((tabLabel: string) => {
    setActiveTab(tabLabel);
    if (onChangeTab) onChangeTab(tabLabel)
  }, []);

  let content: React.ReactNode = null;
  const buttons: ButtonProps[] = [];

  React.Children.forEach(children, (child) => {
      buttons.push({label: child.props.label, disabled: child.props.disabled === true});
      if (child.props.label === activeTab) {
        content = child.props.children;
      }
  });

  return (
    <div className="tabs">
      <TabButtons activeTab={activeTab} buttons={buttons} changeTab={changeTab} />
      <div className="tab-content mt-6">
        {content || <></>}
      </div>
    </div>
  );
};
