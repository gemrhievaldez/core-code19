document.addEventListener('DOMContentLoaded', () => {
    /** @type {Array<{id:string,fileName:string,uploadedBy:string,uploadedAt:string,fileType:string,status:'pending'|'approved'|'rejected',totalRows:number,previewRows:Array<{date:string,productName:string,category:'Toiletries'|'Canned Goods'|'Snacks'|'Frozen Goods'|'Beverages'|'Condiments'|string,quantity:number,unitPrice:number,totalCost:number}>,history:Array<{date:string,action:string,by:string,notes?:string}>}>} */
    const imports = [
      {
        id: 'imp-1',
        fileName: 'Q1_Expenses_2024.xlsx',
        uploadedBy: 'John Smith',
        uploadedAt: '2024-01-15 10:30 AM',
        fileType: '.xlsx',
        status: 'pending',
        totalRows: 145,
        previewRows: [
          { date: '2024-01-05', productName: 'Safeguard Soap', category: 'Toiletries', quantity: 16, unitPrice: 20, totalCost: 320 },
          { date: '2024-01-06', productName: 'Argentina Corned Beef', category: 'Canned Goods', quantity: 135, unitPrice: 77.56, totalCost: 10470.6 },
          { date: '2024-01-07', productName: 'Piattos Cheese', category: 'Snacks', quantity: 133, unitPrice: 54.73, totalCost: 7279.09 },
          { date: '2024-01-08', productName: 'Purefoods Hotdog', category: 'Frozen Goods', quantity: 167, unitPrice: 89.07, totalCost: 14874.69 },
          { date: '2024-01-09', productName: 'Coca-Cola 1.5L', category: 'Beverages', quantity: 40, unitPrice: 58.5, totalCost: 2340 },
          { date: '2024-01-10', productName: 'UFC Banana Catsup', category: 'Condiments', quantity: 60, unitPrice: 35, totalCost: 2100 }
        ],
        history: [
          { date: '2024-01-15 10:30 AM', action: 'Uploaded', by: 'John Smith' }
        ]
      },
      {
        id: 'imp-2',
        fileName: 'Monthly_Budget_Jan.csv',
        uploadedBy: 'Sarah Johnson',
        uploadedAt: '2024-01-14 02:15 PM',
        fileType: '.csv',
        status: 'approved',
        totalRows: 82,
        previewRows: [
          { date: '2024-01-01', productName: 'Head & Shoulders Shampoo', category: 'Toiletries', quantity: 144, unitPrice: 81.86, totalCost: 11787.84 },
          { date: '2024-01-03', productName: 'Century Tuna Flakes', category: 'Canned Goods', quantity: 90, unitPrice: 34.75, totalCost: 3127.5 },
          { date: '2024-01-05', productName: 'Nova Chips BBQ', category: 'Snacks', quantity: 120, unitPrice: 18.25, totalCost: 2190 },
          { date: '2024-01-07', productName: 'Magnolia Chicken', category: 'Frozen Goods', quantity: 22, unitPrice: 130, totalCost: 2860 },
          { date: '2024-01-10', productName: 'Sprite 1.5L', category: 'Beverages', quantity: 35, unitPrice: 59, totalCost: 2065 },
          { date: '2024-01-12', productName: 'Knorr Liquid Seasoning', category: 'Condiments', quantity: 48, unitPrice: 28.5, totalCost: 1368 }
        ],
        history: [
          { date: '2024-01-14 02:15 PM', action: 'Uploaded', by: 'Sarah Johnson' },
          { date: '2024-01-14 03:10 PM', action: 'Approved', by: 'Admin' }
        ]
      },
      {
        id: 'imp-3',
        fileName: 'Utilities_Data.xlsx',
        uploadedBy: 'Michael Chen',
        uploadedAt: '2024-01-13 09:45 AM',
        fileType: '.xlsx',
        status: 'rejected',
        totalRows: 0,
        previewRows: [
          { date: '—', productName: '—', category: '—', quantity: 0, unitPrice: 0, totalCost: 0 }
        ],
        history: [
          { date: '2024-01-13 09:45 AM', action: 'Uploaded', by: 'Michael Chen' },
          { date: '2024-01-13 10:05 AM', action: 'Rejected', by: 'Admin', notes: 'Missing required columns' }
        ]
      },
      {
        id: 'imp-4',
        fileName: 'Supplies_Import.csv',
        uploadedBy: 'Emily Davis',
        uploadedAt: '2024-01-12 11:20 AM',
        fileType: '.csv',
        status: 'pending',
        totalRows: 64,
        previewRows: [
          { date: '2024-01-02', productName: 'Colgate Toothpaste', category: 'Toiletries', quantity: 70, unitPrice: 55, totalCost: 3850 },
          { date: '2024-01-04', productName: 'Mega Sardines', category: 'Canned Goods', quantity: 60, unitPrice: 26.5, totalCost: 1590 },
          { date: '2024-01-05', productName: 'Oishi Prawn Crackers', category: 'Snacks', quantity: 110, unitPrice: 12.75, totalCost: 1402.5 },
          { date: '2024-01-06', productName: 'Virginia Hotdog', category: 'Frozen Goods', quantity: 45, unitPrice: 95, totalCost: 4275 },
          { date: '2024-01-09', productName: 'Royal Tru-Orange', category: 'Beverages', quantity: 30, unitPrice: 62, totalCost: 1860 },
          { date: '2024-01-11', productName: 'Heinz Ketchup', category: 'Condiments', quantity: 25, unitPrice: 85, totalCost: 2125 }
        ],
        history: [
          { date: '2024-01-12 11:20 AM', action: 'Uploaded', by: 'Emily Davis' }
        ]
      }
    ];

    let currentFilter = 'all';
    let selectedImportId = null;

    const listView = document.getElementById('im-list-view');
    const detailView = document.getElementById('im-detail-view');
    const tableBody = document.getElementById('im-table-body');
    const emptyState = document.getElementById('im-empty-state');

    const backBtn = document.getElementById('im-back-btn');
    const decisionButtons = document.getElementById('im-decision-buttons');
    const decisionForm = document.getElementById('im-decision-form');
    const actionSelect = document.getElementById('im-action-select');
    const rejectReasonRow = document.getElementById('im-reject-reason-row');
    const reasonSelect = document.getElementById('im-reason-select');
    const commentsEl = document.getElementById('im-comments');
    const confirmBtn = document.getElementById('im-confirm-btn');
    const cancelBtn = document.getElementById('im-cancel-btn');

    const detailFileName = document.getElementById('im-detail-file-name');
    const detailUploadedBy = document.getElementById('im-detail-uploaded-by');
    const detailTotalRows = document.getElementById('im-detail-total-rows');
    const detailUploadedAt = document.getElementById('im-detail-uploaded-at');
    const previewNote = document.getElementById('im-preview-note');
    const previewBody = document.getElementById('im-preview-body');

    function statusLabel(status) {
      if (status === 'approved') return 'Approved';
      if (status === 'rejected') return 'Rejected';
      return 'Pending';
    }

    function statusClass(status) {
      if (status === 'approved') return 'im-status--approved';
      if (status === 'rejected') return 'im-status--rejected';
      return 'im-status--pending';
    }

    function formatHistory(importItem) {
      const rows = (importItem.history || []).map(h => {
        const notes = h.notes ? ` — ${h.notes}` : '';
        return `- ${h.date}: ${h.action} by ${h.by}${notes}`;
      });
      return rows.length ? rows.join('\n') : 'No history available.';
    }

    const globalMenu = document.getElementById('im-global-menu');
    let menuAnchorBtn = null;

    function closeMenu() {
      if (!globalMenu) return;
      globalMenu.hidden = true;
      globalMenu.dataset.id = '';
      if (menuAnchorBtn) {
        menuAnchorBtn.setAttribute('aria-expanded', 'false');
        menuAnchorBtn = null;
      }
    }

    function openMenu(anchorBtn, importId) {
      if (!globalMenu) return;

      // Toggle when clicking the same trigger
      if (!globalMenu.hidden && globalMenu.dataset.id === importId) {
        closeMenu();
        return;
      }

      closeMenu();
      globalMenu.dataset.id = importId;
      globalMenu.hidden = false;
      menuAnchorBtn = anchorBtn;
      menuAnchorBtn.setAttribute('aria-expanded', 'true');

      // Position the menu near the button (viewport-fixed so it never gets clipped)
      const rect = anchorBtn.getBoundingClientRect();
      globalMenu.style.left = '0px';
      globalMenu.style.top = '0px';

      const m = globalMenu.getBoundingClientRect();
      const padding = 12;

      let left = rect.right - m.width;
      left = Math.max(padding, Math.min(left, window.innerWidth - m.width - padding));

      let top = rect.bottom + 8;
      if (top + m.height > window.innerHeight - padding) {
        top = rect.top - m.height - 8;
      }
      top = Math.max(padding, Math.min(top, window.innerHeight - m.height - padding));

      globalMenu.style.left = `${left}px`;
      globalMenu.style.top = `${top}px`;
    }

    function getFilteredImports() {
      if (currentFilter === 'all') return imports;
      return imports.filter(i => i.status === currentFilter);
    }

    function renderImportTable() {
      const rows = getFilteredImports();
      tableBody.innerHTML = '';

      if (!rows.length) {
        emptyState.hidden = false;
        return;
      }

      emptyState.hidden = true;
      for (const item of rows) {
        const tr = document.createElement('tr');
        tr.dataset.id = item.id;

        tr.innerHTML = `
          <td class="im-td-file">
            <span class="im-file-name">${item.fileName}</span>
          </td>
          <td>${item.uploadedBy}</td>
          <td>${item.uploadedAt}</td>
          <td>${item.fileType}</td>
          <td>
            <span class="im-status ${statusClass(item.status)}">${statusLabel(item.status)}</span>
          </td>
          <td class="im-td-actions">
            <div class="im-actions">
              <button type="button" class="im-view-btn" data-action="view" aria-label="View import details">
                <span class="im-view-icon">
                  <svg class="im-eye-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="im-view-text">View</span>
              </button>

              <button type="button" class="im-kebab" data-action="menu" aria-haspopup="true" aria-expanded="false" aria-label="More actions">
                ⋮
              </button>
            </div>
          </td>
        `;

        tableBody.appendChild(tr);
      }
    }

    function showListView() {
      selectedImportId = null;
      detailView.hidden = true;
      listView.hidden = false;
      decisionForm.hidden = true;
      decisionButtons.hidden = false;
      actionSelect.value = '';
      reasonSelect.value = '';
      commentsEl.value = '';
      rejectReasonRow.hidden = false;
      confirmBtn.textContent = 'Confirm';
      closeMenu();
    }

    function showDetailView(importId) {
      const item = imports.find(i => i.id === importId);
      if (!item) return;

      selectedImportId = importId;
      listView.hidden = true;
      detailView.hidden = false;
      closeMenu();

      detailFileName.textContent = item.fileName;
      detailUploadedBy.textContent = item.uploadedBy;
      detailTotalRows.textContent = String(item.totalRows);
      detailUploadedAt.textContent = item.uploadedAt;

      const shown = Math.min(6, item.previewRows.length);
      previewNote.textContent = `Showing first ${shown} rows of ${item.totalRows} total rows`;
      previewBody.innerHTML = '';

      item.previewRows.slice(0, 6).forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.date}</td>
          <td>${row.productName}</td>
          <td>${row.category}</td>
          <td>${row.quantity}</td>
          <td>${Number(row.unitPrice).toFixed(2)}</td>
          <td>${Number(row.totalCost).toFixed(2)}</td>
        `;
        previewBody.appendChild(tr);
      });

      // reset decision UI
      decisionForm.hidden = true;
      decisionButtons.hidden = false;
      actionSelect.value = '';
      reasonSelect.value = '';
      commentsEl.value = '';
      rejectReasonRow.hidden = false;
      confirmBtn.textContent = 'Confirm';
    }

    function openDecisionForm(decision) {
      decisionButtons.hidden = true;
      decisionForm.hidden = false;

      if (decision === 'approve') {
        actionSelect.value = 'approve';
      } else if (decision === 'reject') {
        actionSelect.value = 'reject';
      } else {
        actionSelect.value = '';
      }

      syncDecisionFormUI();
    }

    function syncDecisionFormUI() {
      const action = actionSelect.value;
      const isReject = action === 'reject';
      rejectReasonRow.hidden = false;

      if (!isReject) {
        reasonSelect.value = '';
      }

      if (action === 'approve') confirmBtn.textContent = 'Confirm Approval';
      else if (action === 'reject') confirmBtn.textContent = 'Confirm Rejection';
      else confirmBtn.textContent = 'Confirm';
    }

    function updateImportStatus(importId, nextStatus, meta = {}) {
      const item = imports.find(i => i.id === importId);
      if (!item) return;
      item.status = nextStatus;
      const now = new Date();
      const stamp = now.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      const action = nextStatus === 'approved' ? 'Approved' : nextStatus === 'rejected' ? 'Rejected' : 'Updated';
      item.history = item.history || [];
      item.history.push({ date: stamp, action, by: 'Admin', notes: meta.notes });
    }

    function downloadImport(importId) {
      const item = imports.find(i => i.id === importId);
      if (!item) return;

      const header = 'date,product_name,category,quantity,unit_price,total_cost\n';
      const body = item.previewRows
        .slice(0, 50)
        .map(r => [
          r.date,
          r.productName,
          r.category,
          r.quantity,
          Number(r.unitPrice).toFixed(2),
          Number(r.totalCost).toFixed(2)
        ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
        .join('\n');

      const blob = new Blob([header + body + '\n'], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.fileName.replace(/\.(xlsx|csv)$/i, '') + '_preview.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    function showHistory(importId) {
      const item = imports.find(i => i.id === importId);
      if (!item) return;
      alert(formatHistory(item));
    }

    function deleteImport(importId) {
      const idx = imports.findIndex(i => i.id === importId);
      if (idx === -1) return;
      const item = imports[idx];
      const ok = confirm(`Delete "${item.fileName}"? This can't be undone.`);
      if (!ok) return;
      imports.splice(idx, 1);
      if (selectedImportId === importId) {
        showListView();
      }
      renderImportTable();
    }

    // Filters
    document.querySelectorAll('.im-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter || 'all';
        document.querySelectorAll('.im-filter-btn').forEach(b => b.classList.toggle('is-active', b === btn));
        renderImportTable();
      });
    });

    // Table actions (delegated)
    tableBody.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const tr = target.closest('tr');
      if (!tr) return;
      const id = tr.dataset.id;
      if (!id) return;

      const actionEl = target.closest('[data-action]');
      const action = actionEl ? actionEl.getAttribute('data-action') : null;

      if (action === 'view') {
        showDetailView(id);
        return;
      }

      if (action === 'menu') {
        openMenu(/** @type {HTMLButtonElement} */ (actionEl), id);
        return;
      }
    });

    // Global menu actions
    globalMenu.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const btn = target.closest('[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const id = globalMenu.dataset.id;
      if (!id) return;

      closeMenu();

      if (action === 'download') {
        downloadImport(id);
      } else if (action === 'history') {
        showHistory(id);
      } else if (action === 'delete') {
        deleteImport(id);
      }
    });

    // Outside click closes menu
    document.addEventListener('click', (e) => {
      const el = /** @type {HTMLElement} */ (e.target);
      if (el.closest('#im-global-menu')) return;
      if (el.closest('.im-kebab')) return;
      closeMenu();
    });

    window.addEventListener('resize', closeMenu);
    window.addEventListener('scroll', closeMenu, true);

    // ESC closes menus / exits detail form first
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!decisionForm.hidden) {
        decisionForm.hidden = true;
        decisionButtons.hidden = false;
        actionSelect.value = '';
        reasonSelect.value = '';
        commentsEl.value = '';
        rejectReasonRow.hidden = false;
        confirmBtn.textContent = 'Confirm';
        return;
      }
      closeMenu();
    });

    // Detail: back
    backBtn.addEventListener('click', showListView);

    // Detail: decision buttons
    decisionButtons.addEventListener('click', (e) => {
      const el = /** @type {HTMLElement} */ (e.target);
      const btn = el.closest('[data-decision]');
      if (!btn) return;
      const decision = btn.getAttribute('data-decision');
      openDecisionForm(decision);
    });

    // Detail: decision form
    actionSelect.addEventListener('change', syncDecisionFormUI);
    cancelBtn.addEventListener('click', () => {
      decisionForm.hidden = true;
      decisionButtons.hidden = false;
      actionSelect.value = '';
      reasonSelect.value = '';
      commentsEl.value = '';
      rejectReasonRow.hidden = false;
      confirmBtn.textContent = 'Confirm';
    });

    decisionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!selectedImportId) return;

      const action = actionSelect.value;
      if (action !== 'approve' && action !== 'reject') {
        alert('Please choose an action.');
        return;
      }

      if (action === 'reject' && !reasonSelect.value) {
        alert('Please select a rejection reason.');
        return;
      }

      const notesParts = [];
      if (action === 'reject') notesParts.push(`Reason: ${reasonSelect.options[reasonSelect.selectedIndex].text}`);
      if (commentsEl.value.trim()) notesParts.push(`Comments: ${commentsEl.value.trim()}`);
      const notes = notesParts.length ? notesParts.join(' | ') : undefined;

      updateImportStatus(selectedImportId, action === 'approve' ? 'approved' : 'rejected', { notes });
      renderImportTable();
      showListView();
    });

    // Initial render
    renderImportTable();
  });