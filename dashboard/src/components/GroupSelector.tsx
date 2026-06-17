import React, { useState, useRef, useEffect } from 'react';

interface GroupItem {
  name: string;
  children?: GroupItem[];
}

const groupData: GroupItem[] = [
  {
    name: '一分',
    children: [
      { name: '一所' },
      { name: '二所' },
      { name: '三所' }
    ]
  },
  { name: '二分' },
  { name: '三分' },
  { name: '四分' }
];

const GroupSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('集团');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (itemName: string, hasChildren: boolean) => {
    if (hasChildren) {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(itemName)) {
        newExpanded.delete(itemName);
      } else {
        newExpanded.add(itemName);
      }
      setExpandedItems(newExpanded);
    } else {
      setSelectedGroup(itemName);
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderGroupItem = (item: GroupItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);
    const paddingLeft = level * 1.5 + 0.75;

    return (
      <div key={item.name}>
        <button
          className={`group-item ${hasChildren ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}`}
          style={{ paddingLeft: `${paddingLeft}rem` }}
          onClick={() => handleItemClick(item.name, hasChildren || false)}
        >
          <span className="item-text">{item.name}</span>
          {hasChildren && (
            <svg className={`expand-icon ${isExpanded ? 'rotated' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="sub-items">
            {item.children!.map((child) => renderGroupItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="group-selector" ref={dropdownRef}>
      <button className="group-btn" onClick={toggleDropdown}>
        {selectedGroup}
        <svg className={`arrow ${isOpen ? 'rotated' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="group-dropdown">
          <div className="dropdown-header">
            <button
              className="back-to-root"
              onClick={() => {
                setSelectedGroup('集团');
                setIsOpen(false);
              }}
            >
              集团
            </button>
          </div>
          <div className="dropdown-content">
            {groupData.map((item) => renderGroupItem(item, 0))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSelector;